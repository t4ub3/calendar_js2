class CustomCard extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute("title");
        const content = this.innerHTML;

        this.innerHTML = `
      <section class="card">
        <h2 class="card__title">${title}</h2>
        <hr class="card__divider" />
        <div>
          ${content}
        </div>
      </section>
    `;
    }
}

customElements.define("custom-card", CustomCard);