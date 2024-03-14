import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 events are shown by default", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given(
      "a user has not specified a number of events in the input field",
      () => {
        AppComponent = render(<App />);
      }
    );

    when("the user views the events section", () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      expect(EventListDOM).toBeInTheDocument();
    });

    then(/^(\d+) events are shown by default$/, async (arg0) => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test("User can change the number of events displayed.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the user has just opened the app", () => {
      AppComponent = render(<App />);
    });

    when(
      "the user changes the value of the “number of events” input field",
      async () => {
        const user = userEvent.setup();
        AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
        const numberOfEventsInput = within(NumberOfEventsDOM).queryByRole(
          "number-of-events-input"
        );
        await user.type(numberOfEventsInput, "{backspace}{backspace}10");
      }
    );

    then("the number of events in the list will change accordingly", () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      const allRenderedEventItems =
        within(EventListDOM).queryAllByRole("listitem");
      expect(allRenderedEventItems.length).toEqual(10);
    });
  });
});
