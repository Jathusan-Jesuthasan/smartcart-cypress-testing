describe("SmartCart - Assertion Tests", () => {

  // Runs before each test case
  beforeEach(() => {
    cy.visit("http://localhost:5173")
  })


  // Check if login page elements are visible
  it("should display the login form elements", () => {
    cy.get("#email").should("be.visible")
    cy.get("#password").should("be.visible")
    cy.get("#login-button").should("be.visible")
  })


  // Check validation when user submits empty form
  it("should show validation message when fields are empty", () => {
    cy.get("#login-button").click()

    cy.get("#error-message")
      .should("be.visible")
      .and("contain", "Email and password are required")
  })


  // Check invalid login attempt
  it("should display error message for invalid login credentials", () => {
    cy.get("#email").type("wrong@gmail.com")
    cy.get("#password").type("wrongpass")
    cy.get("#login-button").click()

    cy.get("#error-message")
      .should("be.visible")
      .and("contain", "Invalid email or password")
  })


  // Check successful login and navigation
  it("should redirect user to menu page after valid login", () => {
    cy.get("#email").type("jesuthasanjathusan@gmail.com")
    cy.get("#password").type("Jathu1234@")
    cy.get("#login-button").click()

    cy.url().should("include", "/menu")
    cy.get("#welcome-text").should("be.visible")
  })


  // Verify cart updates when adding an item
  it("should update cart count after adding an item", () => {
    cy.get("#email").type("jesuthasanjathusan@gmail.com")
    cy.get("#password").type("Jathu1234@")
    cy.get("#login-button").click()

    cy.contains("Add to Cart").first().click()

    cy.get("#cart-button").should("contain", "1")
  })


  // Verify checkout flow
  it("should redirect to success page after checkout", () => {
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