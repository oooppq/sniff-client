/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/auth/:path*',
  //       destination: `https://abcode.shop/api/v1/:path*`,
  //     },
  //   ];
  // },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'acode-bucket-fragrance.s3.ap-northeast-2.amazonaws.com',
      'acode-bucket-review.s3.ap-northeast-2.amazonaws.com',
      'acode-bucket-brand.s3.ap-northeast-2.amazonaws.com',
      'acode-bucket-family.s3.ap-northeast-2.amazonaws.com',
      'acode-bucket-ingredient.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
