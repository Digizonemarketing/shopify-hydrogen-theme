import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const isDev = process.env.NODE_ENV !== 'production';

  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    // NOTE: Passing these arrays replaces Hydrogen defaults, so include 'self'
    // and (in dev) allow Vite/React Router module scripts and HMR.
    styleSrc: [
      "'self'",
      'https://fonts.googleapis.com',
      'https://cdnwidget.judge.me',
      ...(isDev ? ["'unsafe-inline'"] : []),
    ],
    fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnwidget.judge.me'],
    scriptSrc: [
      "'self'",
      'https://cdnwidget.judge.me',
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    connectSrc: [
      "'self'",
      'https://cache.judge.me',
      'https://judge.me',
      ...(isDev ? ['ws:', 'wss:'] : []),
    ],
    imgSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://cdnwidget.judge.me',
      'https://cache.judge.me',
      'https://judge.me',
      'data:',
      'blob:',
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
