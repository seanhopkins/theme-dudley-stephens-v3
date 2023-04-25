class MonogramToggle extends HTMLElement {
  constructor() {
    super();

    this.monogramModal = new theme.Modals("MonogramModal", "monogram-modal");

    this.addToCart = document.querySelector("button.add-to-cart");

    this.checkbox = this.querySelector('input[type="checkbox"]');
    this.buttonWrapper = this.querySelector(".monogram-button-wrapper");
  }

  connectedCallback() {
    this.checkbox.addEventListener("change", this.toggleButtons.bind(this));
  }

  toggleButtons() {
    this.buttonWrapper.classList.toggle("hide");
    this.addToCart.classList.toggle("hide");
  }
}

customElements.define("monogram-toggle", MonogramToggle);

class MonogramCustomizer extends HTMLElement {
  constructor() {
    super();

    this.form = this.querySelector("form");
    this.monogramIdEls = this.querySelectorAll(".js-monogram-id");
    this.parentVariantIdEls = this.querySelectorAll(".js-parent-variant-id");
  }

  setMonogramIds(id) {
    this.monogramIdEls.forEach((el) => {
      el.value = id;
    });
  }

  setVariantIds(id) {
    this.parentVariantIdEls.forEach((el) => {
      el.value = id;
    });
  }

  connectedCallback() {
    this.setMonogramIds(crypto.randomUUID());

    if (theme.settings.cartType === "drawer") {
      new theme.AjaxProduct(this.form, ".monogram__add-to-cart");
    }

    document.addEventListener("ajaxProduct:added", () => {
      this.setMonogramIds(crypto.randomUUID());
    });

    document.addEventListener("variant:change", (e) => {
      this.setVariantIds(e.detail.variant.id);
    });
  }
}

customElements.define("monogram-customizer", MonogramCustomizer);
