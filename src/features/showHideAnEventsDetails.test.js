import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import Event from "../components/Event";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  //Scenario 1
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let AppComponent;
    given("the main page is open", () => {
      AppComponent = render(<App />);
    });

    when("the app displays a list of all upcoming events", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    then("the event should be collapsed by default", () => {
      const AppDOM = AppComponent.container.firstChild;
      const details = AppDOM.querySelector(".details");
      expect(details).not.toBeInTheDocument();
    });
  });

  //Scenario 2
  test("User clicks to show event details.", ({ given, when, then }) => {
    let EventComponent;
    let allEvents;
    given("there is an event with hidden details", async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      expect(
        EventComponent.container.querySelector(".details")
      ).not.toBeInTheDocument();
    });

    when("the user clicks on the event to show details", async () => {
      const showDetails = EventComponent.queryByText("Show Details");
      const user = userEvent.setup();
      await user.click(showDetails);
    });

    then("the app should display the details of the event", () => {
      expect(
        EventComponent.container.querySelector(".details")
      ).toBeInTheDocument();
    });
  });

  //Scenario 3
  test("User can collapse an event to hide details.", ({
    given,
    when,
    then,
  }) => {
    let EventComponent;
    let allEvents;
    given("there is an event that is showing details", async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      await user.click(EventComponent.queryByText("Show details"));
      expect(
        EventComponent.container.querySelector(".details")
      ).not.toBeInTheDocument();
    });
    when("the user clicks on the event to hide details", async () => {
      const user = userEvent.setup();
      await user.click(EventComponent.queryByText("Hide details"));
    });

    then("the app should collapse the details of the event", () => {
      expect(
        EventComponent.container.querySelector(".details")
      ).not.toBeInTheDocument();
      expect(
        EventComponent.queryByText("hide details")
      ).not.toBeInTheDocument();
    });
  });
});
