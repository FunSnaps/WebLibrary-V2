/// <reference types="cypress" />

describe("Login test", () => {
    it('Should go to Login page and login ',  () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#exampleInputEmail').type('ADMIN@gmail.com');
        cy.get('#exampleInputPassword').type('admin123');
        cy.get('fieldset > .btn').click();
    });
})

describe("Logout test", () => {
    it('Should click logout button',  () => {
        cy.get(':nth-child(6) > .nav-link').click();
    });
})
