import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vardz — Cloud & Software Engineer',
    short_name: 'Vardz',
    description: 'Portfolio of Jericho Varde, a passionate Software Engineer & Cloud Enthusiast.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F0E0D',
    theme_color: '#0F0E0D',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
