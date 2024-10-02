// Unit tests for: activity

import activity from "@/checks/activity";
import { StatusCheck } from "@/types/checks";

// Mock interface for Repo
interface MockRepo {
  pushed_at: string;
}

describe("activity() activity method", () => {
  let mockRepo: MockRepo;

  beforeEach(() => {
    // Initialize mockRepo with a default pushed_at date
    mockRepo = {
      pushed_at: new Date().toISOString(),
    };
  });

  describe("Happy Path", () => {
    it("should return success status when the repo was pushed within the last 7 days", () => {
      // Set pushed_at to 5 days ago
      mockRepo.pushed_at = new Date(
        Date.now() - 5 * 24 * 60 * 60 * 1000
      ).toISOString();

      const result: StatusCheck = activity(mockRepo as any);

      expect(result.status).toBe("success");
      expect(result.description).toBe("Your project is active.");
      expect(result.extra).toBe("No action required.");
    });

    it("should return warning status when the repo was pushed between 8 and 29 days ago", () => {
      // Set pushed_at to 15 days ago
      mockRepo.pushed_at = new Date(
        Date.now() - 15 * 24 * 60 * 60 * 1000
      ).toISOString();

      const result: StatusCheck = activity(mockRepo as any);

      expect(result.status).toBe("warning");
      expect(result.description).toBe(
        "Your project needs more recent activity."
      );
      expect(result.extra).toBe("Are there any bugs that can be fixed?");
    });

    it("should return error status when the repo was pushed 30 or more days ago", () => {
      // Set pushed_at to 35 days ago
      mockRepo.pushed_at = new Date(
        Date.now() - 35 * 24 * 60 * 60 * 1000
      ).toISOString();

      const result: StatusCheck = activity(mockRepo as any);

      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "There has been no activity for 35 days."
      );
      expect(result.extra).toBe(
        "Are there any features that can be implemented?"
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle exactly 7 days ago as success", () => {
      // Set pushed_at to exactly 7 days ago
      mockRepo.pushed_at = new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000
      ).toISOString();

      const result: StatusCheck = activity(mockRepo as any);

      expect(result.status).toBe("success");
      expect(result.description).toBe("Your project is active.");
      expect(result.extra).toBe("No action required.");
    });

    it("should handle exactly 30 days ago as error", () => {
      // Set pushed_at to exactly 30 days ago
      mockRepo.pushed_at = new Date(
        Date.now() - 30 * 24 * 60 * 60 * 1000
      ).toISOString();

      const result: StatusCheck = activity(mockRepo as any);

      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "There has been no activity for 30 days."
      );
      expect(result.extra).toBe(
        "Are there any features that can be implemented?"
      );
    });

    it("should handle future dates gracefully", () => {
      // Set pushed_at to a future date
      mockRepo.pushed_at = new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
      ).toISOString();

      const result: StatusCheck = activity(mockRepo as any);

      expect(result.status).toBe("success");
      expect(result.description).toBe("Your project is active.");
      expect(result.extra).toBe("No action required.");
    });
  });
});

// End of unit tests for: activity
