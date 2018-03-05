Feature: Button Test Feature

  Scenario: Opening Button Test Page

    Given I open button test page
    Then test button is present
    And button text is "Test Button"
    And and button is green
