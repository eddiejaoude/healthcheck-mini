// Unit tests for: topics

import topics from "@/checks/topics";

// Mock interface for Repo
interface MockRepo {
  topics: string[];
}

describe("topics() topics method", () => {
  let mockRepo: MockRepo;

  beforeEach(() => {
    // Initialize mockRepo with default values
    mockRepo = {
      topics: [],
    };
  });

  describe("Happy Path", () => {
    it("should return success when topics length is within the range", () => {
      // Test description: Ensure the function returns success when the number of topics is within the acceptable range.
      mockRepo.topics = [
        "topic1",
        "topic2",
        "topic3",
        "topic4",
        "topic5",
        "topic6",
      ];
      const result = topics(mockRepo as any);
      expect(result).toEqual({
        title: "Topics",
        status: "success",
        description: "You have a good number of repo topics.",
        extra: "No action required.",
      });
    });
  });

  describe("Edge Cases", () => {
    it("should return error when there are no topics", () => {
      // Test description: Ensure the function returns an error when there are no topics.
      mockRepo.topics = [];
      const result = topics(mockRepo as any);
      expect(result).toEqual({
        title: "Topics",
        status: "error",
        description: "There are no repo topics at the top right.",
        extra: "It is important to be discoverable using topics.",
      });
    });

    it("should return warning when topics length is less than minimum", () => {
      // Test description: Ensure the function returns a warning when the number of topics is less than the minimum required.
      mockRepo.topics = ["topic1", "topic2", "topic3", "topic4", "topic5"];
      const result = topics(mockRepo as any);
      expect(result).toEqual({
        title: "Topics",
        status: "warning",
        description: "You should add some more topics.",
        extra: "Try to include more topics.",
      });
    });

    it("should return warning when topics length is more than maximum", () => {
      // Test description: Ensure the function returns a warning when the number of topics exceeds the maximum allowed.
      mockRepo.topics = [
        "topic1",
        "topic2",
        "topic3",
        "topic4",
        "topic5",
        "topic6",
        "topic7",
        "topic8",
        "topic9",
        "topic10",
        "topic11",
        "topic12",
        "topic13",
      ];
      const result = topics(mockRepo as any);
      expect(result).toEqual({
        title: "Topics",
        status: "warning",
        description: "You may have too many topics.",
        extra: "Try reducing the amount of your topics.",
      });
    });
  });
});

// End of unit tests for: topics
