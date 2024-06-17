/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin')
const nextConfig = {
	images: {
		domains: ['images.pexels.com', 'pngfre.com', 'files.edgestore.dev']
	},
	typescript: {
		ignoreBuildErrors: true
	},
	env: {
		BASE_URL: process.env.BASE_URL || 'http://localhost:3000'
	}
}
const withNextIntl = createNextIntlPlugin('./src/app/i18n.ts')

/** @type {import('next').NextConfig} */

module.exports = withNextIntl(nextConfig)