## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## SSR Technology

When you use Suspense in a server-rendered page, there is no extra configuration required to use streaming SSR. When deployed, streaming can be utilized through infrastructure like Edge Functions on Vercel (with the Edge Runtime) or with a Node.js server (with the Node.js runtime). AWS Lambda Functions do not currently support streaming responses.

All SSR pages have the ability to render components into streams and the client continues receiving updates from these streams even after the initial SSR response is sent. When any suspended components resolve down the line, they are rendered on the server and streamed to the client. This means applications can start emitting HTML even before all the data is ready, improving your app's loading performance.

As an added bonus, in streaming SSR mode the client will also use selective hydration to prioritize component hydration based on user interactions, further improving performance.

For non-SSR pages, all Suspense boundaries will still be statically optimized.

## SSG Technology

a page uses Static Generation, the page HTML is generated at build time. That means in production, the page HTML is generated when you run next build . This HTML will then be reused on each request. It can be cached by a CDN.

In Next.js, you can statically generate pages with or without data.

## SSG with data

Some pages require fetching external data for pre-rendering. There are two scenarios, and one or both might apply. In each case, you can use these functions that Next.js provides:

- Your page content depends on external data: Use getStaticProps.
- Your page paths depend on external data: Use getStaticPaths (usually in addition to getStaticProps).

