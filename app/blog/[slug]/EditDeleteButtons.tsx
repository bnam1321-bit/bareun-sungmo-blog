'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EditDeleteButtonsProps {
  slug: string;
  initialTitle: string;
  initialDescription: string;
  initialTags: string[];
  initialContent: string;
}

export default function EditDeleteButtons({
  slug,
  initialTitle,
  initialDescription,
  initialTags,
  initialContent,
}: EditDeleteButtonsProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  
  // 수정 폼 상태들
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [tags, setTags] = useState(initialTags.join(', '));
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 비밀번호 입력창 확인 모달/프롬프트
  const handleEditClick = () => {
    const pwdInput = prompt('수정하려면 비밀번호를 입력해주세요:');
    if (pwdInput === null) return; // 취소
    if (pwdInput !== '2626') {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setPassword(pwdInput);
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    const pwdInput = prompt('삭제하려면 비밀번호를 입력해주세요:');
    if (pwdInput === null) return; // 취소
    if (pwdInput !== '2626') {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!confirm('정말로 이 포스트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/posts?slug=${encodeURIComponent(slug)}&password=${encodeURIComponent(pwdInput)}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('포스트가 성공적으로 삭제되었습니다.');
        router.push('/blog');
        router.refresh();
      } else {
        alert(`삭제 실패: ${data.error || '알 수 없는 오류가 발생했습니다.'} ${data.details ? `(${data.details})` : ''}`);
      }
    } catch (err: any) {
      console.error(err);
      alert('삭제 도중 통신 에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용은 필수 항목입니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          title,
          description,
          tags: parsedTags,
          content,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('포스트가 성공적으로 수정되었습니다.');
        setIsEditing(false);
        window.location.reload();
      } else {
        setError(data.error || '수정 도중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.error(err);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-amber-100 my-8 animate-fade-in">
        <h2 className="text-2xl font-black text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
          <span>📝</span> 포스트 수정 모드
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm font-semibold rounded-2xl border border-red-100">
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="포스트 제목을 입력해주세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">설명 (SEO Description)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all h-20 resize-none"
              placeholder="검색 결과에 표시될 포스트에 대한 설명을 작성해주세요"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">태그 (쉼표로 구분)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="예: 건강정보, 내과, 예방접종"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">본문 내용 (Markdown 지원)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all h-[450px] font-mono text-sm leading-relaxed"
              placeholder="마크다운 양식으로 본문 내용을 작성해주세요."
              required
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors cursor-pointer"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-stone-800 text-white font-bold rounded-2xl hover:bg-stone-950 transition-colors shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  저장 중...
                </>
              ) : (
                '저장하기'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="border-t border-stone-200 pt-6 mt-6 flex justify-end gap-4">
      <button
        onClick={handleEditClick}
        disabled={isLoading}
        className="text-stone-500 hover:text-stone-800 text-xs font-semibold underline decoration-stone-300 underline-offset-4 transition-colors cursor-pointer bg-transparent border-none"
      >
        수정
      </button>
      <button
        onClick={handleDeleteClick}
        disabled={isLoading}
        className="text-red-500 hover:text-red-700 text-xs font-semibold underline decoration-red-300 underline-offset-4 transition-colors cursor-pointer bg-transparent border-none"
      >
        삭제
      </button>
    </div>
  );
}
