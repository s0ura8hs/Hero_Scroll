/** @type {import('next').NextConfig} */
const repoName = "car-scroll-hero";
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: isGitHubPages ? `/${repoName}/` : undefined,
  images: { unoptimized: true }
};

export default nextConfig;
