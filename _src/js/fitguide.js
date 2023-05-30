import Alpine from 'alpinejs';

Alpine.data('test', () => ({
  openTab: 1,
  async getPage(handle) {
    const response = await fetch(`/pages/${handle}`);
    const responseHTML = await response.text();

    const frag = document.createRange().createContextualFragment(responseHTML);
    const mainContent = frag.querySelector('#MainContent');

    // Alpine needs this as a string
    return mainContent.outerHTML;
  },
  reRegisterSections() {
    setTimeout(() => {
      theme.sections.register('product', theme.Product);
      theme.sections.register('photoswipe', theme.Photoswipe);
      theme.sections.register('product-recommendations', theme.Recommendations);
      theme.sections.register('slideshow-section', theme.SlideshowSection);
      theme.sections.register('background-image', theme.BackgroundImage);
      theme.sections.register('testimonials', theme.Testimonials);
      theme.sections.register('carousels', theme.Carousels);
      theme.sections.register('video-section', theme.VideoSection);
      theme.sections.register('recently-viewed', theme.RecentlyViewed);

      var api = new Yotpo.API(yotpo);
      api.refreshWidgets();
    }, 1);
  },
}));

Alpine.start();
