import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import Routes from "./routes";

jest.mock("./routes", () => () => (
  <div data-testid="routes">Routes Component</div>
));

describe("App Component", () => {
  test("renders App component", () => {
    render(<App />);
  });
});
