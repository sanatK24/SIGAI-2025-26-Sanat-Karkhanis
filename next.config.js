/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const isLocal = process.env.NODE_ENV === 'development';


const nextConfig = {
  output: 'export',
  // basePath and assetPrefix removed for local static export
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  
  // For local development
  env: {},

  // Note: This feature is required to use NextJS Image in SSG mode.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'slelguoygbfzlpylpxfs.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'slelguoygbfzlpylpxfs.supabase.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        canvas: false,
      };
      
      // Make all asset paths relative in development
      if (!isProd) {
        config.output.publicPath = './';
        // Ensure all chunks are loaded from relative paths
        if (config.optimization && config.optimization.splitChunks) {
          config.optimization.splitChunks = {
            ...config.optimization.splitChunks,
            chunks: 'all',
            cacheGroups: {
              default: false,
              vendors: false,
              // All chunks will be loaded from relative paths
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                reuseExistingChunk: true,
                filename: 'static/chunks/[name].js',
                chunkFilename: 'static/chunks/[name].[contenthash].js'
              }
            }
          };
        }
      }
    }
    return config;
  },
  
  // Disable static page optimization for local development
  outputFileTracingRoot: isLocal ? undefined : __dirname,

  
  transpilePackages: ['@radix-ui', '@headlessui/react'],
};

export default nextConfig;