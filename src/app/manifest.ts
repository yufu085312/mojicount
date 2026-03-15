import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MojiCount｜文字数カウントアプリ',
    short_name: 'MojiCount',
    description: 'SNS・SEO・原稿用紙対応の文字数カウントアプリ。',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb', // blue-600
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
