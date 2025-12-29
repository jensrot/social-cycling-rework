/// <reference types="cypress" />

import axios from 'axios';

context('Authentication', () => {
    const url = 'http://localhost:3000';

    const name = Cypress.env('auth_name');
    const email = Cypress.env('auth_email');
    const password = Cypress.env('auth_password');

    beforeEach(() => {
        // Removed the created users
        // Save the data in a test database?
        // Remove the account
        // axios.post("")
        // call my seeder?
        //     cy.visit(`${url}/login`)
    })

    it('Creates a user', () => {
        cy.visit(`${url}/register`)

        cy.getByDataSel('name')
            .type(name, { delay: 100 })

        cy.getByDataSel('email')
            .type(email, { delay: 100 })

        cy.getByDataSel('password')
            .type(`${password}`, { delay: 100 })

        cy.getByDataSel('repeat-password')
            .type(`${password}{enter}`, { delay: 100 })
    });

    it('Successfully logs in', () => {
        // cy.location("pathname").should("equal", `${url}/login`);

        // TODO: Check first that we are in login route before it searches for those elements,
        // Bug is now it finds email in register while loading so it goes and picks that
        cy.getByDataSel('email')
            .type(email, { delay: 100 })

        cy.getByDataSel('password')
            .type(`${password}{enter}`, { delay: 100 })
    });
})