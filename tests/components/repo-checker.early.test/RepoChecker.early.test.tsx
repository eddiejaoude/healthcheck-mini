// Unit tests for: RepoChecker

import React from "react";
import checks from "@/checks/index";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RepoChecker } from "@/components/repo-checker";
import { getAllApi } from "@/lib/github/getAllApi";
import mockRepo from "../../mocks/repo.json";
import { Convert } from "@/models/github/repo";
import { Report } from "@/types/checks";

// Mocking getAllApi and checks functions
jest.mock("@/lib/github/getAllApi");
jest.mock("@/checks/index");

describe("RepoChecker() RepoChecker method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Happy Path", () => {
    it("should render the RepoChecker component correctly", () => {
      // Test to ensure the component renders correctly
      render(<RepoChecker />);
      expect(
        screen.getByText("GitHub Repository Contributor Readiness Check")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("https://github.com/username/repo")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /check/i })
      ).toBeInTheDocument();
    });

    it("should handle form submission and display report", async () => {
      // Mocking the API and checks response
      const mockData = {
        repo: Convert.toRepo(JSON.stringify(mockRepo)),
      };
      const mockReport: Report = {
        allChecks: [
          {
            title: "check1",
            status: "success",
            description: "well done",
            extra: "no action",
          },
        ],
        score: 50,
        summary: {
          success: 5,
          warning: 4,
          error: 3,
        },
      };
      (getAllApi as jest.Mock).mockReturnValue(mockData);
      (checks as jest.Mock).mockReturnValue(mockReport);

      render(<RepoChecker />);

      // Simulate user input and form submission
      fireEvent.change(
        screen.getByPlaceholderText("https://github.com/username/repo"),
        {
          target: { value: "https://github.com/username/repo" },
        }
      );
      fireEvent.click(screen.getByRole("button", { name: /check/i }));

      // Wait for the report to be displayed
      await waitFor(() => {
        expect(screen.getByText("check1")).toBeInTheDocument();
      });

      // Ensure the mocked functions were called
      expect(getAllApi).toHaveBeenCalledWith(
        "https://github.com/username/repo"
      );
      expect(checks).toHaveBeenCalledWith(mockData);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty input gracefully", async () => {
      // Test to ensure the component handles empty input
      render(<RepoChecker />);
      fireEvent.click(screen.getByRole("button", { name: /check/i }));

      // Ensure no API call is made
      expect(getAllApi).not.toHaveBeenCalled();
      expect(checks).not.toHaveBeenCalled();
    });

    it("should handle API errors gracefully", async () => {
      // Mocking an API error
      (getAllApi as jest.Mock).mockRejectedValue(new Error("API Error"));

      render(<RepoChecker />);

      // Simulate user input and form submission
      fireEvent.change(
        screen.getByPlaceholderText("https://github.com/username/repo"),
        {
          target: { value: "https://github.com/username/repo" },
        }
      );
      fireEvent.click(screen.getByRole("button", { name: /check/i }));

      // Wait for the error handling
      await waitFor(() => {
        expect(screen.queryByText("check1")).not.toBeInTheDocument();
      });

      // Ensure the mocked functions were called
      expect(getAllApi).toHaveBeenCalledWith(
        "https://github.com/username/repo"
      );
      expect(checks).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: RepoChecker
