import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts'); 

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: '**', pathname: '/**' },
      { protocol: 'http' as const, hostname: '**', pathname: '/**' },
    ],
  },
};

export default withNextIntl(nextConfig);