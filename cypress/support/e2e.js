Cypress.Commands.add(
    "login",
    (username = Cypress.env("DEFAULT_USERNAME"), password = Cypress.env("DEFAULT_PASSWORD"), shouldFail = false) => {
        cy.get("input[name=username]").type(username);
        cy.get("input[name=password]").type(password);
        cy.get("button[type=submit]").click();
        if (!shouldFail) {
            cy.get("button[data-testid=logout]").should("exist");
        } else {
            cy.contains("Error logging in").should("exist");
        }
    }
);

Cypress.Commands.add("logout", () => {
    cy.get("button[data-testid=logout]").click();
    cy.contains("Log In").should("exist");
});
