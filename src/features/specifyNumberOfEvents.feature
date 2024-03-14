Feature: Specify Number of Events
    Scenario: When user hasn’t specified a number, 32 events are shown by default.
        Given a user has not specified a number of events in the input field
        When the user views the events section
        Then 32 events are shown by default

    Scenario: User can change the number of events displayed.
        Given the user has just opened the app
        When the user changes the value of the “number of events” input field
        Then the number of events in the list will change accordingly
