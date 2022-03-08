/// <reference types="cypress" />

describe("Login test (as an Admin w/ permissions)", () => {
    it('Should go to Login page and login ',  () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#exampleInputEmail').type('ADMIN@gmail.com');
        cy.get('#exampleInputPassword').type('admin123');
        cy.get('fieldset > .btn').click();
    });
})

describe("Edit a user test", () => {
    it('Should go to users page and pick and edit a user',  () => {
        cy.get('.dropdown > .nav-link').click();
        cy.get(':nth-child(4) > .nav-link').click();
        cy.get(':nth-child(4) > .card > .card-body > a > .far').click();
        cy.get('#exampleInputName1').type('CYPRESS_TEST_EDITED');
        cy.get('#exampleInputEmail1').type('CYPRESS_TEST_EDITED@gmail.com');
        cy.get('#exampleInputPassword1').type('CYPRESS_TEST_EDITED');
        cy.get('#exampleInputCredits').type('750');
        cy.get('.custom-select').select('employee');
        cy.get('fieldset > .btn').click();
        cy.get(':nth-child(4) > .nav-link').click();
    });
})
