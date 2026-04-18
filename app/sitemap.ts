import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://ariimpex.com';
	const lastModified = new Date();

	// Static routes
	const staticRoutes = [
		'/',
		'/art-decor',
		'/jewellery',
		'/legal',
		'/shoes',
		'/suits-shirts'
	];

	// Generate sitemap entries for static routes
	const staticEntries = staticRoutes.map(route => ({
		url: `${baseUrl}${route}`,
		lastModified,
		changeFrequency: 'daily' as const,
		priority: 0.8
	}));

	// Combine static and dynamic routes
	return [...staticEntries];
}
