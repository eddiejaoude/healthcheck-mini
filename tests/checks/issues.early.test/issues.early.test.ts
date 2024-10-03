// Unit tests for: issues

import issues from "@/checks/issues";
import { StatusCheck } from "@/types/checks";

// Mock interface for Repo
interface MockRepo {
  open_issues: number;
}

describe("issues() issues method", () => {
  let mockRepo: MockRepo;

  beforeEach(() => {
    // Initialize mockRepo with default values
    mockRepo = {
      open_issues: 0,
    };
  });

  // Happy path tests
  describe("Happy Path", () => {
    it("should return success status when open issues are greater than max", () => {
      // Test description: Ensure the function returns a success status when open issues exceed the maximum threshold.
      mockRepo.open_issues = 21;
      const result: StatusCheck = issues(mockRepo as any);

      expect(result.status).toBe("success");
      expect(result.description).toBe("You have open issues.");
      expect(result.extra).toBe("No action required.");
    });

    it("should return warning status when open issues are within min and max", () => {
      // Test description: Ensure the function returns a warning status when open issues are within the min and max range.
      mockRepo.open_issues = 10;
      const result: StatusCheck = issues(mockRepo as any);

      expect(result.status).toBe("warning");
      expect(result.description).toBe("You have some open issues.");
      expect(result.extra).toBe(
        "Are there any bugs or features ideas you have?"
      );
    });

    it("should return error status when open issues are less than min", () => {
      // Test description: Ensure the function returns an error status when open issues are below the minimum threshold.
      mockRepo.open_issues = 3;
      const result: StatusCheck = issues(mockRepo as any);

      expect(result.status).toBe("error");
      expect(result.description).toBe("There are not enough open issues.");
      expect(result.extra).toBe(
        "Try creating some more, or asking the community for ideas."
      );
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should return warning status when open issues are exactly at min", () => {
      // Test description: Ensure the function returns a warning status when open issues are exactly at the minimum threshold.
      mockRepo.open_issues = 5;
      const result: StatusCheck = issues(mockRepo as any);

      expect(result.status).toBe("warning");
      expect(result.description).toBe("You have some open issues.");
      expect(result.extra).toBe(
        "Are there any bugs or features ideas you have?"
      );
    });

    it("should return warning status when open issues are exactly at max", () => {
      // Test description: Ensure the function returns a warning status when open issues are exactly at the maximum threshold.
      mockRepo.open_issues = 20;
      const result: StatusCheck = issues(mockRepo as any);

      expect(result.status).toBe("warning");
      expect(result.description).toBe("You have some open issues.");
      expect(result.extra).toBe(
        "Are there any bugs or features ideas you have?"
      );
    });

    it("should handle zero open issues gracefully", () => {
      // Test description: Ensure the function handles zero open issues gracefully, returning an error status.
      mockRepo.open_issues = 0;
      const result: StatusCheck = issues(mockRepo as any);

      expect(result.status).toBe("error");
      expect(result.description).toBe("There are not enough open issues.");
      expect(result.extra).toBe(
        "Try creating some more, or asking the community for ideas."
      );
    });
  });
});

// End of unit tests for: issues
