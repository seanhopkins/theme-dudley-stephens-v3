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
    this.parentTitleEls = this.querySelectorAll(".js-parent-title");
    this.monogramStyleEls = this.querySelectorAll(".js-monogram-style");
  }

  setElementValues(elements, value) {
    elements.forEach((el) => {
      el.value = value;
    });
  }

  connectedCallback() {
    this.setElementValues(this.monogramIdEls, crypto.randomUUID());

    if (theme.settings.cartType === "drawer") {
      new theme.AjaxProduct(this.form, ".monogram__add-to-cart");
    }

    document.addEventListener("ajaxProduct:added", () => {
      this.setElementValues(this.monogramIdEls, crypto.randomUUID());
    });

    document.addEventListener("variant:change", (e) => {
      this.setElementValues(this.parentVariantIdEls, e.detail.variant.id);
      this.setElementValues(this.parentTitleEls, e.detail.variant.name);
    });

    this.form.addEventListener("change", (e) => {
      this.setElementValues(this.monogramStyleEls, e.target.dataset.title);
    });
  }
}

customElements.define("monogram-customizer", MonogramCustomizer);
