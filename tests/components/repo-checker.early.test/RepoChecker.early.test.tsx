// Unit tests for: RepoChecker

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { RepoChecker } from "../../../src/components/repo-checker";
import "@testing-library/jest-dom";

describe("RepoChecker() RepoChecker method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it("should render the RepoChecker component correctly", () => {
      // Render the component
      render(<RepoChecker />);

      // Check if the title and description are rendered
      expect(
        screen.getByText("GitHub Repository Contributor Readiness Check")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Enter a GitHub repository URL to check its readiness for contributors"
        )
      ).toBeInTheDocument();
    });

    it("should update the input value when typed into", () => {
      // Render the component
      render(<RepoChecker />);

      // Get the input element
      const input = screen.getByPlaceholderText(
        "https://github.com/username/repo"
      );

      // Simulate typing into the input
      fireEvent.change(input, {
        target: { value: "https://github.com/example/repo" },
      });

      // Check if the input value is updated
      expect(input).toHaveValue("https://github.com/example/repo");
    });

    it("should display status checks after form submission", () => {
      // Render the component
      render(<RepoChecker />);

      // Get the input and button elements
      const input = screen.getByPlaceholderText(
        "https://github.com/username/repo"
      );
      const button = screen.getByText("Check");

      // Simulate typing into the input and submitting the form
      fireEvent.change(input, {
        target: { value: "https://github.com/example/repo" },
      });
      fireEvent.click(button);

      // Check if the status checks are displayed
      expect(
        screen.getByText("Contributor Readiness Report")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Status checks for https://github.com/example/repo")
      ).toBeInTheDocument();
      expect(screen.getByText("README")).toBeInTheDocument();
      expect(
        screen.getByText("README.md file is present and detailed.")
      ).toBeInTheDocument();
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should not display status checks if the input is empty", () => {
      // Render the component
      render(<RepoChecker />);

      // Get the button element
      const button = screen.getByText("Check");

      // Simulate clicking the button without entering a URL
      fireEvent.click(button);

      // Check that status checks are not displayed
      expect(
        screen.queryByText("Contributor Readiness Report")
      ).not.toBeInTheDocument();
    });

    it("should handle invalid URL input gracefully", () => {
      // Render the component
      render(<RepoChecker />);

      // Get the input and button elements
      const input = screen.getByPlaceholderText(
        "https://github.com/username/repo"
      );
      const button = screen.getByText("Check");

      // Simulate entering an invalid URL and submitting the form
      fireEvent.change(input, { target: { value: "invalid-url" } });
      fireEvent.click(button);

      // Check that status checks are not displayed
      expect(
        screen.queryByText("Contributor Readiness Report")
      ).not.toBeInTheDocument();
    });
  });
});

// End of unit tests for: RepoChecker
