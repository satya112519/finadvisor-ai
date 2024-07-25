import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Messages from "./Messages"; // Adjust the path as necessary
import Message from "../Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";

// Mock the dependencies
jest.mock("react-scroll-to-bottom", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("../Message/Message", () => ({ message, clickSendMessage }) => (
  <div data-testid="message">
    <p>{message.text}</p>
    <button onClick={() => clickSendMessage(message.text)}>Send</button>
  </div>
));

describe("Messages Component", () => {
  const mockMessages = [
    { text: "Message 1", user: "user1" },
    { text: "Message 2", user: "user2" },
    { text: "Message 3", user: "user3" },
  ];
  const mockClickSendMessage = jest.fn();

  it("renders Messages component with a list of messages", () => {
    render(
      <Messages
        messages={mockMessages}
        clickSendMessage={mockClickSendMessage}
      />
    );

    expect(screen.getAllByTestId("message")).toHaveLength(mockMessages.length);
  });

  it("renders each Message component correctly", () => {
    render(
      <Messages
        messages={mockMessages}
        clickSendMessage={mockClickSendMessage}
      />
    );

    expect(screen.getAllByText("Message 1")[0]).toBeInTheDocument();
  });

  it("passes clickSendMessage to each Message component", () => {
    render(
      <Messages
        messages={mockMessages}
        clickSendMessage={mockClickSendMessage}
      />
    );

    mockMessages.forEach((msg, index) => {
      const sendButton = screen.getAllByText("Send")[index];
      sendButton.click();
      expect(mockClickSendMessage).toHaveBeenCalledWith(msg.text);
    });
  });
});
