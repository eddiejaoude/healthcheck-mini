// Unit tests for: defaultBranch

import defaultBranch from "@/checks/defaultBranch";
import { StatusCheck } from "@/types/checks";

// Mock interface for Repo
interface MockRepo {
  default_branch: string;
}

describe("defaultBranch() defaultBranch method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it('should return success status when the default branch is "main"', () => {
      // Arrange: Create a mock repo with the default branch as "main"
      const mockRepo: MockRepo = {
        default_branch: "main",
      } as any;

      // Act: Call the defaultBranch function
      const result: StatusCheck = defaultBranch(mockRepo as any);

      // Assert: Verify the response is as expected
      expect(result.status).toBe("success");
      expect(result.description).toBe(
        "You are using the recommend default branch name."
      );
      expect(result.extra).toBe("No action required.");
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it('should return warning status when the default branch is not "main"', () => {
      // Arrange: Create a mock repo with a different default branch
      const mockRepo: MockRepo = {
        default_branch: "master",
      } as any;

      // Act: Call the defaultBranch function
      const result: StatusCheck = defaultBranch(mockRepo as any);

      // Assert: Verify the response is as expected
      expect(result.status).toBe("warning");
      expect(result.description).toBe(
        "You are not using the recommended default branch name."
      );
      expect(result.extra).toBe(
        "This may confuse contributors on your project."
      );
    });

    it("should handle an empty default branch gracefully", () => {
      // Arrange: Create a mock repo with an empty default branch
      const mockRepo: MockRepo = {
        default_branch: "",
      } as any;

      // Act: Call the defaultBranch function
      const result: StatusCheck = defaultBranch(mockRepo as any);

      // Assert: Verify the response is as expected
      expect(result.status).toBe("warning");
      expect(result.description).toBe(
        "You are not using the recommended default branch name."
      );
      expect(result.extra).toBe(
        "This may confuse contributors on your project."
      );
    });

    it("should handle a null default branch gracefully", () => {
      // Arrange: Create a mock repo with a null default branch
      const mockRepo: MockRepo = {
        default_branch: null as any,
      } as any;

      // Act: Call the defaultBranch function
      const result: StatusCheck = defaultBranch(mockRepo as any);

      // Assert: Verify the response is as expected
      expect(result.status).toBe("warning");
      expect(result.description).toBe(
        "You are not using the recommended default branch name."
      );
      expect(result.extra).toBe(
        "This may confuse contributors on your project."
      );
    });
  });
});

// End of unit tests for: defaultBranch
