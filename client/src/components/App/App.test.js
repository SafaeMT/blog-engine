import { render } from "@testing-library/react";
import App from "./App";

test("image is no longer present in DOM", () => {
  render(<App />);
  const image = document.createElement("img");
  expect(image).not.toBeInTheDocument();
});
