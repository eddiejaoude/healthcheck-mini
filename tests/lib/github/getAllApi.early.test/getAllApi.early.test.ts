// Unit tests for: getAllApi

import { Branch } from "@/models/github/branch";
import { Community } from "@/models/github/community";
import { Issue } from "@/models/github/issue";
import { Label } from "@/models/github/label";
import { Release } from "@/models/github/release";
import { Repo } from "@/models/github/repo";
import { apiRequest } from "../../../../src/lib/github/apiRequest";
import extractOwnerRepo from "../../../../src/lib/github/extractOwnerRepo";
import { getAllApi } from "../../../../src/lib/github/getAllApi";

jest.mock("../../../../src/lib/github/extractOwnerRepo");

jest.mock("../../../../src/lib/github/apiRequest");

describe("getAllApi() getAllApi method", () => {
  const mockRepoUrl = "https://github.com/owner/repo";
  const mockOwner = "owner";
  const mockRepo = "repo";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Happy Path", () => {
    it("should return data when all API requests succeed", async () => {
      // Arrange
      (extractOwnerRepo as jest.Mock).mockReturnValue({
        owner: mockOwner,
        repo: mockRepo,
      });
      (apiRequest as jest.Mock)
        .mockResolvedValueOnce({} as Repo)
        .mockResolvedValueOnce([] as Issue[])
        .mockResolvedValueOnce({} as Community)
        .mockResolvedValueOnce([] as Branch[])
        .mockResolvedValueOnce({} as Release)
        .mockResolvedValueOnce([] as Label[]);

      // Act
      const result = await getAllApi(mockRepoUrl);

      // Assert
      expect(result).toEqual({
        repo: {},
        issues: [],
        community: {},
        branches: [],
        release: {},
        labels: [],
      });
      expect(extractOwnerRepo).toHaveBeenCalledWith(mockRepoUrl);
      expect(apiRequest).toHaveBeenCalledTimes(6);
    });
  });

  describe("Edge Cases", () => {
    it("should throw an error when extractOwnerRepo fails", async () => {
      // Arrange
      (extractOwnerRepo as jest.Mock).mockImplementation(() => {
        throw new Error("GitHub API call(s) failed");
      });

      // Act & Assert
      await expect(getAllApi(mockRepoUrl)).rejects.toThrow(
        "GitHub API call(s) failed"
      );
    });

    it("should throw an error when any API request fails", async () => {
      // Arrange
      (extractOwnerRepo as jest.Mock).mockReturnValue({
        owner: mockOwner,
        repo: mockRepo,
      });
      (apiRequest as jest.Mock)
        .mockResolvedValueOnce({} as Repo)
        .mockRejectedValueOnce(new Error("API request failed"));

      // Act & Assert
      await expect(getAllApi(mockRepoUrl)).rejects.toThrow(
        "GitHub API call(s) failed"
      );
    });
  });
});

// End of unit tests for: getAllApi
