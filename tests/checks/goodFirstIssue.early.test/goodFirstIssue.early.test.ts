// Unit tests for: goodFirstIssue

import goodFirstIssue from "@/checks/goodFirstIssue";
import { StatusCheck } from "@/types/checks";

// Define the MockIssue interface to simulate the Issue class
interface MockIssue {
  labels: string[];
}

describe("goodFirstIssue() goodFirstIssue method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it("should return success when there are more than 3 good first issues", () => {
      // Arrange: Create mock issues with more than 3 having the "good first issue" label
      const mockIssues: MockIssue[] = [
        { labels: ["good first issue"] },
        { labels: ["good first issue"] },
        { labels: ["good first issue"] },
        { labels: ["good first issue"] },
      ] as any;

      // Act: Call the function with the mock issues
      const result: StatusCheck = goodFirstIssue(mockIssues as any);

      // Assert: Verify the response status is success
      expect(result.status).toBe("success");
      expect(result.description).toBe(
        "Great you have open issues with the label good first issue that are ready to be assigned"
      );
      expect(result.extra).toBe("No action required");
    });

    it("should return warning when there are 1 to 3 good first issues", () => {
      // Arrange: Create mock issues with 2 having the "good first issue" label
      const mockIssues: MockIssue[] = [
        { labels: ["good first issue"] },
        { labels: ["good first issue"] },
      ] as any;

      // Act: Call the function with the mock issues
      const result: StatusCheck = goodFirstIssue(mockIssues as any);

      // Assert: Verify the response status is warning
      expect(result.status).toBe("warning");
      expect(result.description).toBe(
        "You currently only have 2 issue that has the label good first issue and is not already assigned"
      );
      expect(result.extra).toBe(
        "These need to be open and not already assigned"
      );
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should return error when there are no good first issues", () => {
      // Arrange: Create mock issues with no "good first issue" label
      const mockIssues: MockIssue[] = [
        { labels: ["bug"] },
        { labels: ["enhancement"] },
      ] as any;

      // Act: Call the function with the mock issues
      const result: StatusCheck = goodFirstIssue(mockIssues as any);

      // Assert: Verify the response status is error
      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "You have no open and unassigned good first issues"
      );
      expect(result.extra).toBe(
        "You will not be appearing in the issue and label search on GitHub"
      );
    });

    it("should handle mixed case labels correctly", () => {
      // Arrange: Create mock issues with mixed case "good first issue" labels
      const mockIssues: MockIssue[] = [
        { labels: ["good first issue"] },
        { labels: ["good-first-issue"] },
      ] as any;

      // Act: Call the function with the mock issues
      const result: StatusCheck = goodFirstIssue(mockIssues as any);

      // Assert: Verify the response status is warning
      expect(result.status).toBe("warning");
      expect(result.description).toBe(
        "You currently only have 2 issue that has the label good first issue and is not already assigned"
      );
      expect(result.extra).toBe(
        "These need to be open and not already assigned"
      );
    });
  });
});

// End of unit tests for: goodFirstIssue
