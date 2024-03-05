import { render } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  let EventComponent;
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });
  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test("renders event title", () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("renders event's start time", () => {
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  test("renders event location", () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
  });

  test("by default, event's detail section should be hidden", () => {
    const detailSection = EventComponent.queryByRole("list");
    expect(detailSection).not.toBeInTheDocument();
  });

  test("shows the detail section when the user clicks on the 'show details' button", async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.queryByRole("button");
    await user.click(showDetailsButton, "Show Details");
    const eventDetails =
      EventComponent.container.querySelector(".eventDetails");
    expect(showDetailsButton).toBeInTheDocument();
  });

  test("hides event details when user clicks 'hide details' button", async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole("button");
    const details = EventComponent.container.querySelector(".details");
    await user.click(button, "Hide Details");
    expect(details).not.toBeInTheDocument();
  });
});
