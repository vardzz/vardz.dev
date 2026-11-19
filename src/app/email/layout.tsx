import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Email',
  description: 'Get in touch with Jericho Varde directly for full-stack engineering contracts, cloud architecture inquiries, or collaborative opportunities.',
  keywords: [
    'Contact Jericho Varde',
    'Hire Software Engineer',
    'Hire Cloud Developer',
    'Freelance Web Developer',
    'Email Jericho Varde',
  ],
  alternates: {
    canonical: '/email',
  },
  openGraph: {
    title: 'Contact | Vardz — Cloud & Software Engineer',
    description: 'Get in touch with Jericho Varde directly for software engineering and cloud consulting.',
    url: '/email',
  },
};

export default function EmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
