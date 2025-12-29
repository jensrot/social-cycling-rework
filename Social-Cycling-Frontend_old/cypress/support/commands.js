/* Select the added custom data attribute */
Cypress.Commands.add("getByDataSel", (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args);
});

/* Click outside an element (for example: closing a popover) */
Cypress.Commands.add('clickOutside', () => {
    return cy.get('body').click(0, 0);
});
