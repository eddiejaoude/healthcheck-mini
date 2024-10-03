// Unit tests for: pullRequestTemplate

import { StatusCheck } from "@/types/checks";
import pullRequestTemplate from "../../../src/checks/pullRequestTemplate";

// Mock interface to simulate the Community class
interface MockCommunity {
  files?: {
    pull_request_template?: boolean;
  };
}

describe("pullRequestTemplate() pullRequestTemplate method", () => {
  // Happy path tests
  describe("Happy Path", () => {
    it("should return success status when pull request template exists", () => {
      // Arrange: Create a mock community with a pull request template
      const mockCommunity: MockCommunity = {
        files: {
          pull_request_template: true,
        },
      } as any;

      // Act: Call the function with the mock community
      const result: StatusCheck = pullRequestTemplate(mockCommunity as any);

      // Assert: Verify the response status and description
      expect(result.status).toBe("success");
      expect(result.description).toBe("You have a Pull Request template.");
      expect(result.extra).toBe("No action required.");
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should return error status when files object is undefined", () => {
      // Arrange: Create a mock community with no files object
      const mockCommunity: MockCommunity = {} as any;

      // Act: Call the function with the mock community
      const result: StatusCheck = pullRequestTemplate(mockCommunity as any);

      // Assert: Verify the response status and description
      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "You do not have a pull request template in your repo."
      );
      expect(result.extra).toBe(
        "This helps people create better pull requests."
      );
    });

    it("should return error status when pull request template does not exist", () => {
      // Arrange: Create a mock community with files but no pull request template
      const mockCommunity: MockCommunity = {
        files: {
          pull_request_template: false,
        },
      } as any;

      // Act: Call the function with the mock community
      const result: StatusCheck = pullRequestTemplate(mockCommunity as any);

      // Assert: Verify the response status and description
      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "You do not have a pull request template in your repo."
      );
      expect(result.extra).toBe(
        "This helps people create better pull requests."
      );
    });
  });
});

// End of unit tests for: pullRequestTemplate
