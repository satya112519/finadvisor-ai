import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Input from "./Input";

afterEach(cleanup);
const mockedUsedNavigate = jest.fn();
const inputProps = {
  message: "hello",
  setMessage: jest.fn(),
  sendMessage: jest.fn(),
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
beforeEach(() => {
  render(<Input {...inputProps} />);
});
afterEach(() => {
  render(<Input {...inputProps} />);
});
describe("Testing Input Component", () => {
  render(<Input {...inputProps} />);
  const sendButton = screen.getByTestId("send-button");
  const inputElement = screen.getByTestId("question");

  console.log("sendButton", sendButton);
  it("Testing question input is exists or not in Input Component", () => {
    fireEvent.change(inputElement, { target: { value: "matti" } });
    fireEvent.keyPress(inputElement, { key: "Enter", charCode: 13 });
    fireEvent.click(sendButton);
  });
  it("2 Testing question input is exists or not in Input Component", () => {
    fireEvent.change(inputElement, { target: { value: "expense" } });
    fireEvent.keyPress(inputElement, {});
    fireEvent.click(sendButton);
  });
});
