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
  }

  setMonogramIds() {
    const monogramIds = this.querySelectorAll(".js-monogram-id");
    const newId = crypto.randomUUID();

    monogramIds.forEach((monogramId) => {
      monogramId.value = newId;
    });
  }

  connectedCallback() {
    this.setMonogramIds();

    if (theme.settings.cartType === "drawer") {
      new theme.AjaxProduct(this.form, ".monogram__add-to-cart");
    }

    document.addEventListener("ajaxProduct:added", (event) => {
      this.setMonogramIds();
    });
  }
}

customElements.define("monogram-customizer", MonogramCustomizer);
