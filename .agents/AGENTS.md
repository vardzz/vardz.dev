# Next.js Routing & Layout Rules

Whenever creating a new page or linking to another route in this Next.js App Router project, strictly enforce the following rules:

1. **Client-Side Navigation Only**: ALWAYS use the Next.js `<Link href="...">` component from `next/link` for navigation between pages. NEVER use standard HTML `<a>` tags. This ensures instantaneous, smooth client-side routing and preserves global React state.

2. **Global Components Belong in Layout**: Any component that appears across multiple pages (e.g., `Navbar`, `Footer`) MUST be implemented in the `src/app/layout.tsx` file, wrapping `{children}`. DO NOT import or render global components inside individual `page.tsx` files. This ensures that their internal state (like dark/light theme) never resets or flickers when navigating between routes.

3. **Global Page Spacing**: The top padding between the Navbar and the page content is managed globally in \src/app/layout.tsx\ via a wrapper \<div className="pt-6">\. Do NOT add top margin or padding (e.g., \pt-*\ or \mt-*\) to the outermost elements of individual page components (\page.tsx\), as this will cause double padding. Maintain this standard for all new pages.

