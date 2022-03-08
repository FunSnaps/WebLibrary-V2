/// <reference types="cypress" />

describe("Register test", () => {
    it('Should go to register page and register ',  () => {
        cy.visit('http://localhost:3000/register');
        cy.get('#exampleInputName1').type('CYPRESS_TEST');
        cy.get('#exampleInputEmail1').type('CYPRESS_TEST@gmail.com');
        cy.get('#exampleInputPassword1').type('CYPRESS_PASSWORD');
        cy.get('fieldset > .btn').click();
    });
})