// Unit tests for: Home

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import { RepoChecker } from "@/components/repo-checker";

// Mock the RepoChecker component
jest.mock("@/components/repo-checker", () => ({
  RepoChecker: jest.fn(),
}));

describe("Home() Home method", () => {
  describe("Happy Path", () => {
    it("should render the RepoChecker component", () => {
      RepoChecker.mockImplementation(() => (
        <div data-testid="repo-checker">RepoChecker Component</div>
      ));

      // This test checks if the RepoChecker component is rendered when Home is rendered.
      const { getByTestId } = render(<Home />);
      expect(getByTestId("repo-checker")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle the absence of RepoChecker gracefully", () => {
      // This test simulates the scenario where RepoChecker might not be available.
      // Since RepoChecker is mocked, this test is more illustrative than functional.
      // jest.mock("@/components/repo-checker", () => ({
      //   RepoChecker: () => null,
      // }));
      RepoChecker.mockImplementation(() => null);

      const { queryByTestId } = render(<Home />);
      expect(queryByTestId("repo-checker")).not.toBeInTheDocument();
    });
  });
});

// End of unit tests for: Home
