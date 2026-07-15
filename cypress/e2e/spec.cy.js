describe("Cinema tests", () => {
  const auth = require("../fixtures/auth.json");
  const selectors = require("../fixtures/selectors.json");

  it("Main page", () => {
    cy.visit("/");
    cy.get(selectors.header).should("be.visible");
  });

  it("Login successfull", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.get(selectors.email).type(auth.login);
    cy.get(selectors.password).type(auth.password);
    cy.contains("Авторизоваться").click();
    cy.get(selectors.admintext).should("have.text", "Администраторррская");
  });

  it("Login unsuccessfull", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.get(selectors.email).type(auth.incorrectLogin);
    cy.get(selectors.password).type(auth.password);
    cy.contains("Авторизоваться").click();
    cy.get(selectors.errortext).should("have.text", "Ошибка авторизации!");
  });

  it("Booking film", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.get(selectors.email).type(auth.login);
    cy.get(selectors.password).type(auth.password);
    cy.contains("Авторизоваться").click();
    cy.get(selectors.titlemovie)
      .first()
      .then(($el) => {
        const movie1 = $el.text();
        cy.log(movie1);
        cy.visit("/");
        cy.get(selectors.chooseday).click();
        cy.get(selectors.titlemovie2)
          .first()
          .then(($el) => {
            const movie2 = $el.text();
            cy.log(movie2);
            expect(movie2).to.contain(movie1);
          });
      });
  });
});
