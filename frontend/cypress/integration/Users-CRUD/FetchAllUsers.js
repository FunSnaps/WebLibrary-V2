/// <reference types="cypress" />

describe("Login test", () => {
    it('Should go to Login page and login ',  () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#exampleInputEmail').type('ADMIN@gmail.com');
        cy.get('#exampleInputPassword').type('admin123');
        cy.get('fieldset > .btn').click();
    });
})

describe("Get all users test", () => {
    it('Should go to users page and show all registered users',  () => {
        cy.get('.dropdown > .nav-link').click();
        cy.get(':nth-child(4) > .nav-link').click();
    });
})