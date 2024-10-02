// Unit tests for: extractOwnerRepo

import extractOwnerRepo from "../../../../src/lib/github/extractOwnerRepo";

describe("extractOwnerRepo() extractOwnerRepo method", () => {
  // Happy Path Tests
  describe("Happy Path", () => {
    it("should correctly extract owner and repo from a valid GitHub URL", () => {
      const url = "https://github.com/owner/repo";
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: "owner", repo: "repo" });
    });

    it("should correctly extract owner and repo from a valid GitHub URL with trailing slash", () => {
      const url = "https://github.com/owner/repo/";
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: "owner", repo: "repo" });
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should return undefined for owner and repo if URL path is incomplete", () => {
      const url = "https://github.com/owner";
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: "owner", repo: undefined });
    });

    it("should return undefined for owner and repo if URL path is empty", () => {
      const url = "https://github.com/";
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: undefined, repo: undefined });
    });

    it("should handle URLs with additional path segments gracefully", () => {
      const url = "https://github.com/owner/repo/extra/path";
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: "owner", repo: "repo" });
    });

    it("should throw an error for an invalid URL", () => {
      const url = "not-a-valid-url";
      expect(() => extractOwnerRepo(url)).toThrow();
    });

    it("should handle URLs with query parameters correctly", () => {
      const url = "https://github.com/owner/repo?query=param";
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: "owner", repo: "repo" });
    });

    it("should handle URLs with hash fragments correctly", () => {
      const url = "https://github.com/owner/repo#section";
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: "owner", repo: "repo" });
    });
  });
});

// End of unit tests for: extractOwnerRepo
