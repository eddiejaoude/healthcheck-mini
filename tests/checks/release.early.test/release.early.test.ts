// Unit tests for: release

import release from "@/checks/release";
import { StatusCheck } from "@/types/checks";

// Import necessary modules and functions

// Import necessary modules and functions
// Define a mock interface for Release
interface MockRelease {
  created_at: string;
}

// Test suite for the release function
describe("release() release method", () => {
  let mockRelease: MockRelease;

  beforeEach(() => {
    // Initialize mockRelease with default values
    mockRelease = {
      created_at: new Date().toISOString(),
    };
  });

  // Happy path tests
  describe("Happy Path", () => {
    it("should return success status when the release is recent", () => {
      // Test description: Ensure the function returns a success status when the release is within the minimum days.
      const result: StatusCheck = release(mockRelease as any);
      expect(result.status).toBe("success");
      expect(result.description).toBe("Your project has a recent release.");
      expect(result.extra).toBe("No action required.");
    });

    it("should return warning status when the release is between min and max days", () => {
      // Test description: Ensure the function returns a warning status when the release is between min and max days.
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 60); // 60 days ago
      mockRelease.created_at = pastDate.toISOString();

      const result: StatusCheck = release(mockRelease as any);
      expect(result.status).toBe("warning");
      expect(result.description).toBe(
        "Your project might need a more recent release."
      );
      expect(result.extra).toBe(
        "Are there any improvments you wish to collect together and release?"
      );
    });

    it("should return error status when the release is older than max days", () => {
      // Test description: Ensure the function returns an error status when the release is older than max days.
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 100); // 100 days ago
      mockRelease.created_at = pastDate.toISOString();

      const result: StatusCheck = release(mockRelease as any);
      expect(result.status).toBe("error");
      expect(result.description).toBe(
        `There has been no release for 100 days.`
      );
      expect(result.extra).toBe(
        "Are there any features or bugs that can be implemented?"
      );
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should return error status when created_at is missing", () => {
      // Test description: Ensure the function returns an error status when created_at is missing.
      mockRelease.created_at = "";

      const result: StatusCheck = release(mockRelease as any);
      expect(result.status).toBe("error");
      expect(result.description).toBe("There are no releases.");
      expect(result.extra).toBe(
        "If your project is ready for people to use, it is recommended to create a release."
      );
    });

    it("should handle the exact boundary of min days correctly", () => {
      // Test description: Ensure the function handles the exact boundary of min days correctly.
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 30); // Exactly 30 days ago
      mockRelease.created_at = pastDate.toISOString();

      const result: StatusCheck = release(mockRelease as any);
      expect(result.status).toBe("success");
      expect(result.description).toBe("Your project has a recent release.");
      expect(result.extra).toBe("No action required.");
    });

    it("should handle the exact boundary of max days correctly", () => {
      // Test description: Ensure the function handles the exact boundary of max days correctly.
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 90); // Exactly 90 days ago
      mockRelease.created_at = pastDate.toISOString();

      const result: StatusCheck = release(mockRelease as any);
      expect(result.status).toBe("error");
      expect(result.description).toBe(`There has been no release for 90 days.`);
      expect(result.extra).toBe(
        "Are there any features or bugs that can be implemented?"
      );
    });
  });
});

// End of unit tests for: release
