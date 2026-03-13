describe("SmartCart Assertions Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173")
  })

  it("Verify login page elements are visible", () => {
    cy.get("#email").should("be.visible")
    cy.get("#password").should("be.visible")
    cy.get("#login-button").should("be.visible")
  })

  it("Empty login should show required field validation", () => {
    cy.get("#login-button").click()

    cy.get("#error-message")
      .should("be.visible")
      .and("contain", "Email and password are required")
  })

  it("Invalid login should show error message", () => {
    cy.get("#email").type("wrong@gmail.com")
    cy.get("#password").type("wrongpass")
    cy.get("#login-button").click()

    cy.get("#error-message")
      .should("be.visible")
      .and("contain", "Invalid email or password")
  })

  it("Valid login should redirect to menu page", () => {
    cy.get("#email").type("jesuthasanjathusan@gmail.com")
    cy.get("#password").type("Jathu1234@")
    cy.get("#login-button").click()

    cy.url().should("include", "/menu")
    cy.get("#welcome-text").should("be.visible")
  })

  it("Add to cart should update cart count", () => {
    cy.get("#email").type("jesuthasanjathusan@gmail.com")
    cy.get("#password").type("Jathu1234@")
    cy.get("#login-button").click()

    cy.contains("Add to Cart").first().click()
    cy.get("#cart-button").should("contain", "1")
  })

  it("Checkout should redirect to success page", () => {
    cy.get("#email").type("jesuthasanjathusan@gmail.com")
    cy.get("#password").type("Jathu1234@")
    cy.get("#login-button").click()

    cy.contains("Add to Cart").first().click()
    cy.get("#cart-button").click()
    cy.get("#checkout-button").click()

    cy.url().should("include", "/success")
    cy.contains("Order Placed Successfully").should("be.visible")
  })
})