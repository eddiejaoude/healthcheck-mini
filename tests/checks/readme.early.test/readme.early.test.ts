// Unit tests for: readme

import { StatusCheck } from "@/types/checks";
import readme from "../../../src/checks/readme";

// Define the MockCommunity interface to simulate the Community class
interface MockCommunity {
  files?: {
    readme?: boolean;
  };
}

describe("readme() readme method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it("should return success status when README file exists", () => {
      // Arrange: Create a mock community with a README file
      const mockCommunity: MockCommunity = {
        files: {
          readme: true,
        },
      } as any;

      // Act: Call the readme function
      const result: StatusCheck = readme(mockCommunity as any);

      // Assert: Verify the response
      expect(result.status).toBe("success");
      expect(result.description).toBe("You have a README file.");
      expect(result.extra).toBe("No action required.");
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should return error status when README file does not exist", () => {
      // Arrange: Create a mock community without a README file
      const mockCommunity: MockCommunity = {
        files: {
          readme: false,
        },
      } as any;

      // Act: Call the readme function
      const result: StatusCheck = readme(mockCommunity as any);

      // Assert: Verify the response
      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "You do not have a readme.md file in your repo."
      );
      expect(result.extra).toBe(
        "This is the most important file in your project."
      );
    });

    it("should return error status when files property is undefined", () => {
      // Arrange: Create a mock community with undefined files
      const mockCommunity: MockCommunity = {} as any;

      // Act: Call the readme function
      const result: StatusCheck = readme(mockCommunity as any);

      // Assert: Verify the response
      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "You do not have a readme.md file in your repo."
      );
      expect(result.extra).toBe(
        "This is the most important file in your project."
      );
    });

    it("should return error status when files property is null", () => {
      // Arrange: Create a mock community with null files
      const mockCommunity: MockCommunity = {
        files: null,
      } as any;

      // Act: Call the readme function
      const result: StatusCheck = readme(mockCommunity as any);

      // Assert: Verify the response
      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "You do not have a readme.md file in your repo."
      );
      expect(result.extra).toBe(
        "This is the most important file in your project."
      );
    });
  });
});

// End of unit tests for: readme
