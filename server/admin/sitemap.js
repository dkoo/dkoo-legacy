sitemaps.add('/sitemap.xml', function() {
	return [{
		page: '/',
		changefreq: 'weekly'
	}, {
		page: '/blog',
		changefreq: 'daily'
	}];
});