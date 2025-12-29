/// <reference types="cypress" />

context('Create group ride', () => {

    const url = 'http://localhost:3000';

    const email = Cypress.env('auth_email');
    const password = Cypress.env('auth_password');

    const enterProfileData = () => {
        cy.getByDataSel("username")
            .type("jensrott", { delay: 100 })

        cy.getByDataSel("level")
            .select("Pro Cyclist").should('have.value', 'Pro Cyclist')

        cy.getByDataSel("location")
            .type("Location", { delay: 100 })

        cy.getByDataSel("form-field-social")
            .click()

        cy.getByDataSel("youtube")
            .type("Youtube", { delay: 100 })

        cy.getByDataSel("twitter")
            .type("Twitter", { delay: 100 })

        cy.getByDataSel("instagram")
            .type("Instagram", { delay: 100 })

        cy.getByDataSel("bio")
            .type("Instagram", { delay: 100 })
    }

    const enterGroupRideData = () => {
        let titles = ["a", "cool", "title"];

        let descriptions = [
            "Not too fast, not too slow.",
            "We always stay together until the end.",
            "We have respect for everyone."
        ];

        let start_locations = [
            "Dynastielaan, De Panne, Belgium",
            "Strandlaan, Koksijde, Belgium",
            "Wondelgemstraat, Ghent, Belgium"
        ]

        let end_locations = [
            "Sint-Pietersplein, Ghent, Belgium",
            "Savaanstraat, Ghent, Belgium",
            "Zwijnaardsesteenweg, Ghent, Belgium"
        ]

        const title = titles[Math.floor(Math.random() * titles.length)];
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        const start_location = start_locations[Math.floor(Math.random() * start_locations.length)];
        const end_location = end_locations[Math.floor(Math.random() * end_locations.length)];

        const start_date = "19/04/2021";
        const start_time = "14";

        cy.getByDataSel("title")
            .type(title, { delay: 100 })

        cy.getByDataSel("description")
            .type(description, { delay: 100 })

        cy.get("#start-date")
            .type(`${start_date}`, { delay: 100 })
            .clickOutside();

        // Start time picker
        cy.xpath("//input[@id='start-time']")
            .click()
            .xpath("//div[@class='rc-time-picker-panel-select']//ul//li")
            .each(($el, index, $list) => {
                var $startTime = $el.text();
                if ($startTime === start_time) {
                    cy.wrap($el).click();
                }
            })

        cy.getByDataSel("start-location")
            .type(start_location, { delay: 100 })

        cy.getByDataSel("end-location")
            .type(end_location, { delay: 100 })
    }

    it('Enters login information and logs in using email', () => {
        cy.visit(`${url}/login`)

        cy.getByDataSel("email")
            .type(email, { delay: 100 })

        cy.getByDataSel("password")
            .type(`${password}`, { delay: 100 })

        cy.getByDataSel("login-local-button")
            .click();
    })

    // If button exists we create a profile otherwise a groupride

    // it('Creates a profile', () => {

    //     // If no account created yet? Check profile button
    //     // if (cy.getByDataSel("create-profile-button").length > 0) {
    //     //     cy.getByDataSel("create-profile-button")
    //     //         .click();

    //     //     enterGroupRideData();
    //     // }

    //     // cy.get("body").then($body => {
    //     //     if ($body.find("a").length > 0) {
    //     //         //evaluates as true
    //     //         // cy.getByDataSel("create-profile-button")
    //     //         //     .click();

    //     //         // enterGroupRideData();
    //     //     }
    //     //     // enterGroupRideData();
    //     // });

    //     // Go to create profile page
    //     cy.getByDataSel("create-profile-button").click();

    //     // cy.url().should('include', )

    //     // Create a profile
    //     enterProfileData();

    // cy.getByDataSel("create-button")
    //         .click();





    //     // Add likes and comments

    //     // Remove the group ride

    //     // Delete the account

    // })

    it('Creates a groupride', () => {
        cy.getByDataSel("create-group-ride-button")
            .click();

        enterGroupRideData();

        cy.getByDataSel("create-button")
            .click();
    })

    // TODO: figure this out the correct way is not good yet
    it('Likes the groupride', () => {
        for (let i = 0; i <= 2; i++) {
            cy.getByDataSel("like-button")
                .click()
        }

        // .click()

        // Check popup
    })

    it('Dislikes the groupride', () => {
        cy.getByDataSel("dislike-button", { timeout: 10000 }).should('be.visible')
            .click();

        // Check popup
    })

    it('Deletes the groupride', () => {
        cy.getByDataSel("delete-button")
            .click()

        cy.getByDataSel("delete-confirm-button")
            .click()
    })
})