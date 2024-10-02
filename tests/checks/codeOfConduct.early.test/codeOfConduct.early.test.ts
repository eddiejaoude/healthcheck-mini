// Unit tests for: codeOfConduct

import codeOfConduct from "@/checks/codeOfConduct";
import { StatusCheck } from "@/types/checks";

// Mock interface for Community
interface MockCommunity {
  files?: {
    code_of_conduct?: boolean;
  };
}

describe("codeOfConduct() codeOfConduct method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it("should return success when code_of_conduct file is present", () => {
      // Arrange: Create a mock community with a code_of_conduct file
      const mockCommunity: MockCommunity = {
        files: {
          code_of_conduct: true,
        },
      } as any;

      // Act: Call the function with the mock community
      const result: StatusCheck = codeOfConduct(mockCommunity as any);

      // Assert: Verify the response is as expected
      expect(result.status).toBe("success");
      expect(result.description).toBe("You have a CoC.");
      expect(result.extra).toBe("No action required.");
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should return error when files object is undefined", () => {
      // Arrange: Create a mock community with no files object
      const mockCommunity: MockCommunity = {} as any;

      // Act: Call the function with the mock community
      const result: StatusCheck = codeOfConduct(mockCommunity as any);

      // Assert: Verify the response is as expected
      expect(result.status).toBe("error");
      expect(result.description).toBe("You do not have a CoC in your repo.");
      expect(result.extra).toBe(
        "This is important for people to know your project and community is safe."
      );
    });

    it("should return error when code_of_conduct file is missing", () => {
      // Arrange: Create a mock community with files object but no code_of_conduct
      const mockCommunity: MockCommunity = {
        files: {},
      } as any;

      // Act: Call the function with the mock community
      const result: StatusCheck = codeOfConduct(mockCommunity as any);

      // Assert: Verify the response is as expected
      expect(result.status).toBe("error");
      expect(result.description).toBe("You do not have a CoC in your repo.");
      expect(result.extra).toBe(
        "This is important for people to know your project and community is safe."
      );
    });
  });
});

// End of unit tests for: codeOfConduct
