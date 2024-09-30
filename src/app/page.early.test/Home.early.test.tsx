// Unit tests for: Home

import React from "react";
import { render } from "@testing-library/react";
import Home from "../page";
import "@testing-library/jest-dom";

// Mock the RepoChecker component
jest.mock("@/components/repo-checker", () => ({
  RepoChecker: () => (
    <div data-testid="repo-checker">RepoChecker Component</div>
  ),
}));

describe("Home() Home method", () => {
  describe("Happy Path", () => {
    it("should render the RepoChecker component", () => {
      // Test to ensure that the RepoChecker component is rendered within the Home component
      const { getByTestId } = render(<Home />);
      expect(getByTestId("repo-checker")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    // Since the Home component is simple and only renders RepoChecker,
    // there are no specific edge cases to test for this component itself.
    // However, if RepoChecker had props or state, you would test those here.
  });
});

// End of unit tests for: Home
