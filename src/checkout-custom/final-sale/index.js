import { CustardModule, STEPS_ALL } from '@discolabs/custard-js';

export class FinalSale extends CustardModule {
  constructor() {
    super();

    this.disclaimer = document.createElement('span');
  }

  id() {
    return 'final-sale';
  }

  steps() {
    return STEPS_ALL;
  }

  selector() {
    return '.order-summary__section--product-list [data-order-summary-section]';
  }

  buildDisclaimer() {
    this.disclaimer.classList.add(
      'product__description__final-sale',
      'order-summary__small-text'
    );

    this.disclaimer.innerText = 'FINAL SALE';
  }

  addDisclaimers() {
    const productRows = this.$element[0].rows;
    const cartItems = this.options.cartItems;

    cartItems.forEach((item, i) => {
      const lowercaseTags = item.tags.map((tag) => tag.toLowerCase());
      if (lowercaseTags.includes('final-sale')) {
        const productRow = productRows.item(i);
        const productDescription = productRow.querySelector(
          '.product__description'
        );

        productDescription.prepend(this.disclaimer.cloneNode(true));
      }
    });
  }

  setup() {
    this.buildDisclaimer();
    this.addDisclaimers();
  }
}
