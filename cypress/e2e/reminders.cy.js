describe("Reminders application ", () => {
  it("opens dashboard ", () => {
    cy.visit("/");

    // Tabs
    cy.get('[data-testid="All-option"]').should("be.visible");
    cy.get('[data-testid="Done-option"]').should("be.visible");
    cy.get('[data-testid="Pending-option"]').should("be.visible");

    // Create button
    cy.get('[data-testid="create-button"]').should("be.visible");

    // No data
    cy.get('[data-testid="no-data"]').should("be.visible");
  });

  it("creates a new reminder ", () => {
    cy.visit("/");

    cy.get('[data-testid="create-button"]').click();

    cy.get("h3").should("contain", "New reminder");

    cy.createNewReminder("Buy milk", "2023-02-02", "cartman");

    cy.get('[data-testid="reminder-name"]').should("contain", "Buy milk");
  });

  it("updates a reminder ", () => {
    cy.visit("/");

    cy.get('[data-testid="create-button"]').click();
    cy.createNewReminder("Buy chicken", "2023-03-02", "hari");

    cy.get('[data-testid="create-button"]').click();
    cy.createNewReminder("Buy milk", "2023-02-02", "cartman");

    cy.get('[data-testid="reminder-card"]').should("have.length", 2);

    cy.get('[data-testid="done-button"]').first().click();

    cy.get('[data-testid="Done-option"]').click();

    cy.get('[data-testid="reminder-card"]').should("have.length", 1);

    cy.get('[data-testid="reminder-name"]').should("contain", "Buy chicken");
  });

  it("deletes a reminder and updates the list ", () => {
    cy.visit("/");

    cy.get('[data-testid="create-button"]').click();
    cy.createNewReminder("Buy chicken", "2023-03-02", "hari");

    cy.get('[data-testid="create-button"]').click();
    cy.createNewReminder("Buy milk", "2023-02-02", "cartman");

    cy.get('[data-testid="reminder-card"]').should("have.length", 2);
    cy.get('[data-testid="reminder-name"]').should("contain", "Buy chicken");

    cy.get('[data-testid="delete-button"]').first().click();

    cy.get('[data-testid="reminder-card"]').should("have.length", 1);
    cy.get('[data-testid="reminder-name"]').should(
      "not.contain",
      "Buy chicken"
    );
  });

  it("filters reminders on Tab clicks ", () => {
    cy.visit("/");

    cy.get('[data-testid="create-button"]').click();
    cy.createNewReminder("Buy chicken", "2023-03-02", "hari");

    cy.get('[data-testid="create-button"]').click();
    cy.createNewReminder("Buy milk", "2023-02-02", "cartman");

    cy.get('[data-testid="create-button"]').click();
    cy.createNewReminder("Buy insurance for car", "2023-02-02", "hari");

    cy.get('[data-testid="reminder-card"]').should("have.length", 3);

    cy.get('[data-testid="done-button"]').eq(1).click();

    cy.get('[data-testid="Done-option"]').click();

    cy.get('[data-testid="reminder-card"]').should("have.length", 1);

    cy.get('[data-testid="Pending-option"]').click();

    cy.get('[data-testid="reminder-card"]').should("have.length", 2);

    cy.get('[data-testid="All-option"]').click();

    cy.get('[data-testid="reminder-card"]').should("have.length", 3);
  });
});
