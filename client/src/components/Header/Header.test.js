import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders header with brand text", () => {
  render(<Header />);
  const element = screen.getByText(/blog-engine/i);
  expect(element).toBeInTheDocument();
});
