import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

function ensureDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// GitHub API로 연동하는 헬퍼 함수
async function getGithubFileSha(slug: string, githubToken: string, owner: string, repo: string) {
  const filePath = `content/posts/${slug}.md`;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'bareun-sungmo-blog-api'
      },
      next: { revalidate: 0 }
    });
    
    if (res.ok) {
      const data = await res.json();
      return data.sha;
    }
  } catch (error) {
    console.error('Error fetching file SHA from GitHub:', error);
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, description, tags, content, coverImage, password } = body;

    // 1. 비밀번호 검증
    if (password !== '2626') {
      return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    if (!slug || !title || !content) {
      return NextResponse.json({ error: '슬러그, 제목, 내용이 필요합니다.' }, { status: 400 });
    }

    ensureDirectory();
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);

    // 기존 메타데이터가 있으면 읽어서 날짜 등을 유지
    let originalDate = new Date().toISOString().split('T')[0];
    let originalCoverImage = coverImage || '';

    if (fs.existsSync(fullPath)) {
      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        if (data.date) originalDate = data.date;
        if (data.coverImage && !coverImage) originalCoverImage = data.coverImage;
      } catch (err) {
        console.error('Error reading original post metadata:', err);
      }
    }

    // 마크다운 파일 조립
    const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${originalDate}"
description: "${(description || '').replace(/"/g, '\\"').replace(/\n/g, ' ')}"
tags: ${JSON.stringify(tags || [])}
author: "더바른성모내과"
coverImage: "${originalCoverImage}"
---

${content}
`;

    // 로컬 파일 쓰기
    try {
      fs.writeFileSync(fullPath, fileContent, 'utf-8');
    } catch (fsError: any) {
      console.warn('Local filesystem write failed (expected on Vercel):', fsError.message);
      if (!process.env.GITHUB_TOKEN) {
        throw fsError;
      }
    }

    // GitHub API 연동
    const githubToken = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'bnam1321-bit';
    const repo = process.env.GITHUB_REPO || 'bareun-sungmo-blog';

    if (githubToken) {
      const sha = await getGithubFileSha(decodedSlug, githubToken, owner, repo);
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/content/posts/${decodedSlug}.md`;
      const base64Content = Buffer.from(fileContent, 'utf-8').toString('base64');
      
      const uploadBody: any = {
        message: `chore: edit post ${decodedSlug}`,
        content: base64Content,
        branch: 'main'
      };
      if (sha) {
        uploadBody.sha = sha;
      }

      const uploadRes = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'bareun-sungmo-blog-api'
        },
        body: JSON.stringify(uploadBody)
      });

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        console.error('GitHub upload failed:', errText);
        return NextResponse.json({ 
          error: '로컬 저장은 완료되었으나 GitHub 동기화에 실패했습니다.', 
          details: errText 
        }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving post:', error);
    return NextResponse.json({ error: '포스트 저장 중 오류가 발생했습니다.', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const password = searchParams.get('password');

    // 1. 비밀번호 검증
    if (password !== '2626') {
      return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    if (!slug) {
      return NextResponse.json({ error: '삭제할 포스트의 슬러그가 필요합니다.' }, { status: 400 });
    }

    ensureDirectory();
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);

    // 로컬 파일 삭제
    try {
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } catch (fsError: any) {
      console.warn('Local filesystem delete failed (expected on Vercel):', fsError.message);
      if (!process.env.GITHUB_TOKEN) {
        throw fsError;
      }
    }

    // GitHub API 연동
    const githubToken = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'bnam1321-bit';
    const repo = process.env.GITHUB_REPO || 'bareun-sungmo-blog';

    if (githubToken) {
      const sha = await getGithubFileSha(decodedSlug, githubToken, owner, repo);
      if (sha) {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/content/posts/${decodedSlug}.md`;
        const deleteRes = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'bareun-sungmo-blog-api'
          },
          body: JSON.stringify({
            message: `chore: delete post ${decodedSlug}`,
            sha: sha,
            branch: 'main'
          })
        });

        if (!deleteRes.ok) {
          const errText = await deleteRes.text();
          console.error('GitHub delete failed:', errText);
          return NextResponse.json({ 
            error: '로컬 삭제는 완료되었으나 GitHub 동기화에 실패했습니다.', 
            details: errText 
          }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: '포스트 삭제 중 오류가 발생했습니다.', details: error.message }, { status: 500 });
  }
}
