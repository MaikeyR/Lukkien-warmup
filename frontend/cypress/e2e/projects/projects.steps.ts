import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { When } from "@badeball/cypress-cucumber-preprocessor";

let projectTitle = "";
let projectContent = "";
let updatedTitle = "";
let updatedContent = "";

const ensureProjectExists = () => {
  if (projectTitle) return;
  projectTitle = `Project ${Date.now()}`;
  projectContent = `Content ${Date.now()}`;
  cy.contains("a", "New project").click();
  cy.get("input#title").clear().type(projectTitle);
  cy.get("textarea#content").clear().type(projectContent);
  cy.contains("button", "Create").click();
  cy.contains("h3", projectTitle, { timeout: 10000 }).should("be.visible");
};

// Scenario: Open the projects page
Given("I open the projects page", () => {
  cy.visit("/projects");
});

Then("I should see the projects heading", () => {
  cy.contains("h1", "Projects").should("be.visible");
});

// Scenario: Create a project
When("I create a new project", () => {
  projectTitle = `Project ${Date.now()}`;
  projectContent = `Content ${Date.now()}`;

  cy.contains("a", "New project").click();
  cy.get("input#title").clear().type(projectTitle);
  cy.get("textarea#content").clear().type(projectContent);
  cy.contains("button", "Create").click();
});

Then("I should see the project in the list", () => {
  cy.contains("h3", projectTitle, { timeout: 10000 }).should("be.visible");
});

// Scenario: Edit a project
When("I open the project detail page", () => {
  ensureProjectExists();
  cy.contains("h3", projectTitle).click();
});

Then("I should see the project details", () => {
  cy.contains("h2", projectTitle).should("be.visible");
  cy.contains("p", projectContent).should("be.visible");
});

When("I edit the project", () => {
  ensureProjectExists();
  updatedTitle = `Updated ${Date.now()}`;
  updatedContent = `Updated content ${Date.now()}`;

  cy.contains("h3", "Edit project").click();
  cy.get("input#title").clear().type(updatedTitle);
  cy.get("textarea#content").clear().type(updatedContent);
  cy.contains("button", "Update").click();
  projectTitle = updatedTitle;
  projectContent = updatedContent;
});

Then("I should see the updated project in the list", () => {
  cy.contains("h3", updatedTitle, { timeout: 10000 }).should("be.visible");
});

// Scenario: Delete a project
When("I delete the project", () => {
  ensureProjectExists();
  cy.contains("h3", projectTitle).click();
  cy.contains("button", "Delete").click();
});

Then("the project should be removed from the list", () => {
  cy.contains("h3", projectTitle, { timeout: 10000 }).should("not.exist");
});
