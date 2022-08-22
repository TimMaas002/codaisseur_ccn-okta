import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const linkElement = screen.getByText(/signup/i);
  expect(linkElement).toBeInTheDocument();
});
