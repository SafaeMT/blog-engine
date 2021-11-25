import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders info about express", () => {
  render(<App />);
  const element = screen.getByText(/express/i);
  expect(element).toBeInTheDocument();
});
