Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default.
        Given the main page is open
        When the app displays a list of all upcoming events
        Then the event should be collapsed by default

    Scenario: User clicks to show event details.
        Given there is an event with hidden details
        When the user clicks on the event to show details
        Then the app should display the details of the event

    Scenario: User can collapse an event to hide details.
        Given there is an event that is showing details
        When the user clicks on the event to hide details
        Then the app should collapse the details of the event
