// Unit tests for: description

import description from "@/checks/description";
import { StatusCheck } from "@/types/checks";

// Mock interface for Repo
interface MockRepo {
  description?: string;
  homepage?: string;
}

describe("description() description method", () => {
  let mockRepo: MockRepo;

  beforeEach(() => {
    mockRepo = {
      description: "",
      homepage: "",
    };
  });

  // Happy Path Tests
  describe("Happy Path", () => {
    it("should return success when repo has a valid description", () => {
      mockRepo.description = "This is a valid description";
      const result: StatusCheck = description(mockRepo as any);

      expect(result.status).toBe("success");
      expect(result.description).toBe("You have a repo description.");
      expect(result.extra).toBe("No action required.");
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should return error when repo has no description", () => {
      mockRepo.description = "";
      const result: StatusCheck = description(mockRepo as any);

      expect(result.status).toBe("error");
      expect(result.description).toBe(
        "There is no repo description at the top right."
      );
      expect(result.extra).toBe(
        "It is important to write a concise description about your repo."
      );
    });

    it("should return warning when description is too short", () => {
      mockRepo.description = "Short";
      const result: StatusCheck = description(mockRepo as any);

      expect(result.status).toBe("warning");
      expect(result.description).toBe("Your description may be too short.");
      expect(result.extra).toBe("Try to include more information.");
    });

    it("should return warning when description is too long", () => {
      mockRepo.description = "L".repeat(201);
      const result: StatusCheck = description(mockRepo as any);

      expect(result.status).toBe("warning");
      expect(result.description).toBe("Your description may be too long.");
      expect(result.extra).toBe("Try reducing the length of your description.");
    });

    it("should return warning when description contains homepage URL", () => {
      mockRepo.description = "This is a description with a URL";
      mockRepo.homepage = "URL";
      const result: StatusCheck = description(mockRepo as any);

      expect(result.status).toBe("warning");
      expect(result.description).toBe(
        "Your description contains a duplicate of the url."
      );
      expect(result.extra).toBe("You can remove the url from the description.");
    });
  });
});

// End of unit tests for: description
