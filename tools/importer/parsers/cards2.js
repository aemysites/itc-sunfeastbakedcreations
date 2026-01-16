/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build the price grid for each card
  function buildPrices(prices, document) {
    // Each price is a clickable div with a logo, price, and shop name
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '16px';
    prices.forEach((priceDiv) => {
      // The clickable element is the .show-popup.shop-cta-button
      const href = priceDiv.getAttribute('href');
      const priceOption = priceDiv.querySelector('.price-option');
      const logo = priceOption ? priceOption.querySelector('img') : null;
      const price = priceOption ? priceOption.querySelector('p') : null;
      const shopName = priceDiv.querySelector('.ecommerce-name');
      // Build a box for each shop
      const box = document.createElement('div');
      box.style.display = 'flex';
      box.style.flexDirection = 'column';
      box.style.alignItems = 'center';
      box.style.border = '1px solid #ccc';
      box.style.padding = '8px';
      box.style.minWidth = '70px';
      // The whole box is a link
      const link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      if (logo) link.appendChild(logo.cloneNode(true));
      if (price) link.appendChild(price.cloneNode(true));
      box.appendChild(link);
      if (shopName) box.appendChild(shopName.cloneNode(true));
      container.appendChild(box);
    });
    return container;
  }

  // Find all product cards
  const cards = Array.from(element.querySelectorAll('.product-card'));
  const rows = [
    ['Cards (cards2)']
  ];

  cards.forEach((card) => {
    // Image (left cell)
    const img = card.querySelector('.product-image');
    // Title (h2)
    const title = card.querySelector('.product-info h2');
    // Prices (right cell, as grid)
    const prices = Array.from(card.querySelectorAll('.product-prices > .show-popup.shop-cta-button'));
    // Build right cell content
    const rightCell = document.createElement('div');
    if (title) {
      const h = document.createElement('h3');
      h.textContent = title.textContent;
      rightCell.appendChild(h);
    }
    if (prices.length) {
      rightCell.appendChild(buildPrices(prices, document));
    }
    rows.push([
      img,
      rightCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
