import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Courses from "./Courses";

test("renders Available Courses heading", () => {
  render(
    <BrowserRouter>
      <Courses />
    </BrowserRouter>
  );

  expect(
    screen.getByText(/Available Courses/i)
  ).toBeInTheDocument();
});
