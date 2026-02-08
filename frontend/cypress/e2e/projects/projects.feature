Feature: Projects

  Scenario: Open the projects page
    Given I open the projects page
    Then I should see the projects heading

  Scenario: Create a project
    Given I open the projects page
    When I create a new project
    Then I should see the project in the list

  Scenario: Edit a project
    Given I open the projects page
    When I create a new project
    And I open the project detail page
    When I edit the project
    Then I should see the updated project in the list

  Scenario: Delete a project
    Given I open the projects page
    When I create a new project
    And I open the project detail page
    When I delete the project
    Then the project should be removed from the list
