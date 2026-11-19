import React from 'react';

export default function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jericho Varde',
    alternateName: 'Vardz',
    url: 'https://vardz.dev',
    image: 'https://vardz.dev/assets/vardz-image.png',
    jobTitle: 'Cloud & Full-Stack Software Engineer',
    sameAs: [
      'https://github.com/vardzz',
      'https://www.linkedin.com/in/vardz/',
    ],
    knowsAbout: [
      'Full-Stack Web Development',
      'Cloud Engineering',
      'Artificial Intelligence',
      'Next.js',
      'React',
      'TypeScript',
      'Amazon Web Services (AWS)',
      'PostgreSQL',
      'Docker',
      'Small Language Models (SLMs)',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vardz',
    url: 'https://vardz.dev',
    description: 'Portfolio of Jericho Varde, a passionate Software Engineer & Cloud Enthusiast.',
    author: {
      '@type': 'Person',
      name: 'Jericho Varde',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
