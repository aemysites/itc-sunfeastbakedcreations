/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Columns block
  const headerRow = ['Columns (columns4)'];

  // --- COLUMN 1: Logo ---
  const logoSection = element.querySelector('.footer-brand__left');
  let logoImg = '';
  if (logoSection) {
    const img = logoSection.querySelector('img');
    if (img) logoImg = img;
  }

  // --- COLUMN 2: Terms of Use link (preserve original text content) ---
  let termsLink = '';
  const navRight = element.querySelector('.footer-brand__navbar--right');
  if (navRight) {
    const termsList = navRight.querySelectorAll('.footerList ul');
    if (termsList[0]) {
      const link = termsList[0].querySelector('a');
      if (link) termsLink = link;
    }
  }

  // --- COLUMN 3: Privacy Policy link (preserve original text content) ---
  let privacyLink = '';
  if (navRight) {
    const privacyList = navRight.querySelectorAll('.footerList ul');
    if (privacyList[1]) {
      const link = privacyList[1].querySelector('a');
      if (link) privacyLink = link;
    }
  }

  // Compose the columns row
  const columnsRow = [logoImg, termsLink, privacyLink];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
