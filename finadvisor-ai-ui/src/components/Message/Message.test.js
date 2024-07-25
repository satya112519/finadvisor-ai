import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Message from "./Message";
import Button from "@mui/material/Button";

jest.mock("../../icons/profile.png", () => "profile.png");
jest.mock("../../icons/robot.png", () => "robot.png");

describe("Message Component", () => {
  const clickSendMessage = jest.fn();

  const setup = (message) => {
    return render(
      <Message message={message} clickSendMessage={clickSendMessage} />
    );
  };

  test("renders message from current user", () => {
    const message = {
      text: "Hello!",
      user: "currentUser",
      buttons: ["test", "qwerty"],
    };

    setup(message);

    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  test("renders message from admin", () => {
    const message = {
      text: "Hello, I am an admin.",
      user: "admin",
      buttons: null,
    };

    setup(message);

    expect(screen.getByText("Hello, I am an admin.")).toBeInTheDocument();
    expect(screen.getByAltText("img")).toHaveAttribute("src", "robot.png");
    expect(
      screen.getByText("Hello, I am an admin.").closest(".messageBox")
    ).toHaveClass("backgroundLight");
  });

  test("renders message with buttons", () => {
    const message = {
      text: "Choose an option:",
      user: "admin",
      buttons: ["Option 1", "Option 2"],
    };

    setup(message);
    fireEvent.click(screen.getByText("Option 1"));
    expect(screen.getByText("Choose an option:")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});
