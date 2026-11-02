import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                userAgent: [
                    'GPTBot',
                    'OAI-SearchBot',
                    'ChatGPT-User',
                    'ClaudeBot',
                    'Claude-Web',
                    'anthropic-ai',
                    'PerplexityBot',
                    'Perplexity-User',
                    'Google-Extended',
                    'GoogleOther',
                    'Googlebot',
                    'Bingbot',
                    'Applebot',
                    'Applebot-Extended',
                    'CCBot',
                    'YouBot',
                    'cohere-ai',
                    'Yeti',
                    'Daum',
                ],
                allow: ['/', '/llms.txt', '/llms-full.txt', '/blog', '/services'],
                disallow: ['/api/'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
