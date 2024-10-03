// Unit tests for: url

import url from "@/checks/url";
import { StatusCheck } from "@/types/checks";

// Mock interface to simulate the Repo class
interface MockRepo {
  homepage?: string;
}

describe("url() url method", () => {
  let mockRepo: MockRepo;

  beforeEach(() => {
    // Initialize mockRepo before each test
    mockRepo = {
      homepage: undefined,
    };
  });

  describe("Happy Path", () => {
    it("should return success status when repo has a homepage", () => {
      // Test description: Ensure the function returns a success status when the repo has a homepage URL.
      mockRepo.homepage = "https://example.com";

      const result: StatusCheck = url(mockRepo as any);

      expect(result.status).toBe("success");
      expect(result.description).toBe("You have a project url.");
      expect(result.extra).toBe("No action required.");
    });
  });

  describe("Edge Cases", () => {
    it("should return error status when repo does not have a homepage", () => {
      // Test description: Ensure the function returns an error status when the repo does not have a homepage URL.
      mockRepo.homepage = undefined;

      const result: StatusCheck = url(mockRepo as any);

      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "There is no repo url under the description at the top right."
      );
      expect(result.extra).toBe(
        "If you do not have a project url, you can add the website or docs url."
      );
    });

    it("should handle empty string as homepage gracefully", () => {
      // Test description: Ensure the function handles an empty string as the homepage URL gracefully.
      mockRepo.homepage = "";

      const result: StatusCheck = url(mockRepo as any);

      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "There is no repo url under the description at the top right."
      );
      expect(result.extra).toBe(
        "If you do not have a project url, you can add the website or docs url."
      );
    });
  });
});

// End of unit tests for: url
