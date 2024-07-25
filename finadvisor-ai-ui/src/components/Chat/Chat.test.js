import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import * as api from "../../api";

jest.mock("react-helmet", () => ({
  Helmet: ({ children }) => <>{children}</>,
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));
jest.mock("../../api", () => ({
  processQuery: jest.fn(),
}));
jest.mock("../InfoBar/InfoBar", () => () => <div>InfoBar Component</div>);
jest.mock("../Input/Input", () => ({ message, setMessage, sendMessage }) => (
  <div>
    <input
      data-testid="input-field"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button onClick={sendMessage}>Send</button>
  </div>
));
jest.mock("../Messages/Messages", () => ({ messages }) => (
  <div>
    {messages.map((msg, index) => (
      <div key={index}>{msg.text}</div>
    ))}
  </div>
));

describe("Chat Component with empty data", () => {
  const mockUserData = {
    UserID: "user-123",
  };

  const mockLocationState = {
    state: {},
  };

  beforeEach(() => {
    require("react-router-dom").useLocation.mockReturnValue(mockLocationState);
  });

  test("renders Chat component with initial state", () => {
    render(<Chat />);
  });
});
describe("Chat Component with empty data", () => {
  const mockUserData = {
    UserID: "user-123",
  };

  const mockLocationState = {
    state: {
      Zip: "12345",
      Phone1: "123-456-7890",
      UserID: "user-123",
    },
  };

  beforeEach(() => {
    require("react-router-dom").useLocation.mockReturnValue(mockLocationState);
  });

  test("renders Chat component with initial state", () => {
    render(<Chat />);
  });
});

describe("Chat Component", () => {
  const mockUserData = {
    LastName: "Doe",
    FirstName: "John",
    Address: "123 Main St",
    City: "Metropolis",
    Country: "Fictionland",
    Zip: "12345",
    Phone1: "123-456-7890",
    UserID: "user-123",
  };

  const mockLocationState = {
    state: {
      userData: mockUserData,
    },
  };

  beforeEach(() => {
    require("react-router-dom").useLocation.mockReturnValue(mockLocationState);
  });

  test("renders Chat component with initial state", () => {
    render(<Chat />);
  });

  test("handles sending a message", async () => {
    const mockResponse = {
      data: {
        text: "Mock response from API",
        user: "admin",
        buttons: [],
      },
    };
    api.processQuery.mockResolvedValueOnce(mockResponse);

    render(<Chat />);

    fireEvent.change(screen.getByTestId("input-field"), {
      target: { value: "Test message" },
    });
    fireEvent.click(screen.getByText("Send"));

    await waitFor(() =>
      expect(api.processQuery).toHaveBeenCalledWith({
        query: "Test message",
        user_id: mockUserData.UserID,
      })
    );
  });
});
