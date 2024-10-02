// Unit tests for: contributing

import contributing from "@/checks/contributing";
import { StatusCheck } from "@/types/checks";

// Mock interface for Community
interface MockCommunity {
  files?: {
    contributing?: boolean;
  };
}

describe("contributing() contributing method", () => {
  // Happy path tests
  describe("Happy Path", () => {
    it("should return success status when contributing guide is present", () => {
      // Arrange: Create a mock community with a contributing guide
      const mockCommunity: MockCommunity = {
        files: {
          contributing: true,
        },
      } as any;

      // Act: Call the contributing function
      const result: StatusCheck = contributing(mockCommunity as any);

      // Assert: Verify the result
      expect(result.status).toBe("success");
      expect(result.description).toBe("You have a contributing guide.");
      expect(result.extra).toBe("No action required.");
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should return error status when contributing guide is absent", () => {
      // Arrange: Create a mock community without a contributing guide
      const mockCommunity: MockCommunity = {
        files: {
          contributing: false,
        },
      } as any;

      // Act: Call the contributing function
      const result: StatusCheck = contributing(mockCommunity as any);

      // Assert: Verify the result
      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "You do not have a contributing guide in your repo."
      );
      expect(result.extra).toBe(
        "This is important, so people know how to get started with your project."
      );
    });

    it("should return error status when files property is undefined", () => {
      // Arrange: Create a mock community with undefined files
      const mockCommunity: MockCommunity = {} as any;

      // Act: Call the contributing function
      const result: StatusCheck = contributing(mockCommunity as any);

      // Assert: Verify the result
      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "You do not have a contributing guide in your repo."
      );
      expect(result.extra).toBe(
        "This is important, so people know how to get started with your project."
      );
    });

    it("should return error status when files property is null", () => {
      // Arrange: Create a mock community with null files
      const mockCommunity: MockCommunity = {
        files: null,
      } as any;

      // Act: Call the contributing function
      const result: StatusCheck = contributing(mockCommunity as any);

      // Assert: Verify the result
      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "You do not have a contributing guide in your repo."
      );
      expect(result.extra).toBe(
        "This is important, so people know how to get started with your project."
      );
    });
  });
});

// End of unit tests for: contributing
