describe("Users", () => {
    const newUserEmail = "foo@bar.com";
    const newUserPass = "foobar";

    const changePassword = (newPassword, confirmNewPassword) => {
        cy.get("*[data-testid=usermenu]").click();
        cy.get("*[data-testid=settings]").click();
        cy.get("*[data-testid=newPassword]").type(newPassword);
        cy.get("*[data-testid=confirmNewPassword]").type(confirmNewPassword);
        cy.get("*[data-testid=submitNewPassword]").click();
        cy.contains("Password successfully changed").should("exist");
    };

    const addUser = (newUserEmail, newUserPassword, newUserConfirmPassword) => {
        cy.get("*[data-testid=usermenu]").click();
        cy.get("*[data-testid=settings]").click();
        cy.get("*[data-testid=newUserEmail]").type(newUserEmail);
        cy.get("*[data-testid=newUserPassword]").type(newUserPassword);
        cy.get("*[data-testid=newUserConfirmPassword]").type(newUserConfirmPassword);
        cy.get("*[data-testid=newUserSubmit]").click();
        cy.contains("Successfully added user").should("exist");
    };

    const verifySuperuser = (isAdmin = true) => {
        const shouldClause = isAdmin ? "exist" : "not.exist";
        cy.get("*[data-testid=usermenu]").click();
        cy.get("*[data-testid=settings]").click();
        cy.contains("Manage Users").should(shouldClause);
        cy.contains("Add User").should(shouldClause);
    };

    const delUser = (email) => {
        cy.get("*[data-testid=usermenu]").click();
        cy.get("*[data-testid=settings]").click();
        cy.get(`*[data-testid="delete-${email}"]`).click();
        cy.contains(email).should("not.exist");
    };

    const toggleSuperuser = (email) => {
        cy.get("*[data-testid=usermenu]").click();
        cy.get("*[data-testid=settings]").click();
        cy.get(`*[data-testid="toggleSuperuser-${email}"]`).click();
    };

    beforeEach(() => {
        cy.visit("/");
    });

    it("Logs in",  () => {
        cy.login();
    });

    it("Logs out", () => {
        cy.login();
        cy.logout();
    });

    it("Changes password", () => {
        const newPassword = "foobar123";
        cy.login();
        changePassword(newPassword, newPassword);
        cy.logout();
        cy.login(Cypress.env("DEFAULT_USERNAME"), newPassword);
        changePassword(Cypress.env("DEFAULT_PASSWORD"), Cypress.env("DEFAULT_PASSWORD"));
    });

    it("Creates a new user", () => {
        cy.login();
        addUser(newUserEmail, newUserPass, newUserPass);
    });

    it("Logs in as the new user and verifies no superuser features", () => {
        cy.login(newUserEmail, newUserPass);
        verifySuperuser(false);
    });

    it("Makes new user a superuser and verifies superuser features", () => {
        cy.login(Cypress.env("DEFAULT_USERNAME"), Cypress.env("DEFAULT_PASSWORD"));
        toggleSuperuser(newUserEmail);
        cy.logout();
        cy.login(newUserEmail, newUserPass);
        verifySuperuser();
    });

    it("Deletes the new user and verifies it can't log in as the deleted user", () => {
        cy.login(Cypress.env("DEFAULT_USERNAME"), Cypress.env("DEFAULT_PASSWORD"));
        delUser(newUserEmail);
        cy.logout();
        cy.login(newUserEmail, newUserPass, true);
    });
});
