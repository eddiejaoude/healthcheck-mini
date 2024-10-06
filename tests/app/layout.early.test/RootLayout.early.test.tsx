// Unit tests for: RootLayout

import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "../../../src/app/layout";
import "@testing-library/jest-dom";

describe("RootLayout() RootLayout method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it("should render children correctly", () => {
      // This test checks if the children are rendered inside the RootLayout component
      const { getByText } = render(
        <RootLayout>
          <div>Test Child</div>
        </RootLayout>
      );
      expect(getByText("Test Child")).toBeInTheDocument();
    });

    it("should apply the correct classes to the body element", () => {
      // This test checks if the body element has the correct classes applied
      const { container } = render(
        <RootLayout>
          <div>Test Child</div>
        </RootLayout>
      );
      const body = container.querySelector("body");
      expect(body).toHaveClass("antialiased");
      expect(body).toHaveClass("--font-geist-sans");
      expect(body).toHaveClass("--font-geist-mono");
    });

    it("should set the lang attribute on the html element", () => {
      // This test checks if the html element has the correct lang attribute
      const { container } = render(
        <RootLayout>
          <div>Test Child</div>
        </RootLayout>
      );
      const html = container.querySelector("html");
      expect(html).toHaveAttribute("lang", "en");
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle no children gracefully", () => {
      // This test checks if the component can handle being rendered without children
      const { container } = render(<RootLayout />);
      const body = container.querySelector("body");
      expect(body).toBeEmptyDOMElement();
    });

    it("should handle multiple children elements", () => {
      // This test checks if the component can handle multiple children elements
      const { getByText } = render(
        <RootLayout>
          <div>Child 1</div>
          <div>Child 2</div>
        </RootLayout>
      );
      expect(getByText("Child 1")).toBeInTheDocument();
      expect(getByText("Child 2")).toBeInTheDocument();
    });
  });
});

// End of unit tests for: RootLayout
