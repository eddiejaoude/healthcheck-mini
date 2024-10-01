
// Unit tests for: issues



import issues from '../../../src/checks/issues';



describe('issues() issues method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    test('should return success status when open issues are greater than max', () => {
      const repo = { open_issues: 21 };
      const expectedResponse = {
        id: "issues",
        href: "/repo/status",
        title: "Issue",
        status: "success",
        description: "You have open issues.",
        extra: "No action required."
      };

      const result = issues(repo);
      expect(result).toEqual(expectedResponse);
    });

    test('should return warning status when open issues are between min and max', () => {
      const repo = { open_issues: 10 };
      const expectedResponse = {
        id: "issues",
        href: "/repo/status",
        title: "Issue",
        status: "warning",
        description: "You have some open issues.",
        extra: "Are there any bugs or features ideas you have?"
      };

      const result = issues(repo);
      expect(result).toEqual(expectedResponse);
    });

    test('should return error status when open issues are less than min', () => {
      const repo = { open_issues: 3 };
      const expectedResponse = {
        id: "issues",
        href: "/repo/status",
        title: "Issue",
        status: "error",
        description: "There are not enough open issues.",
        extra: "Try creating some more, or asking the community for ideas."
      };

      const result = issues(repo);
      expect(result).toEqual(expectedResponse);
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    test('should return warning status when open issues are exactly min', () => {
      const repo = { open_issues: 5 };
      const expectedResponse = {
        id: "issues",
        href: "/repo/status",
        title: "Issue",
        status: "warning",
        description: "You have some open issues.",
        extra: "Are there any bugs or features ideas you have?"
      };

      const result = issues(repo);
      expect(result).toEqual(expectedResponse);
    });

    test('should return warning status when open issues are exactly max', () => {
      const repo = { open_issues: 20 };
      const expectedResponse = {
        id: "issues",
        href: "/repo/status",
        title: "Issue",
        status: "warning",
        description: "You have some open issues.",
        extra: "Are there any bugs or features ideas you have?"
      };

      const result = issues(repo);
      expect(result).toEqual(expectedResponse);
    });

    test('should handle zero open issues gracefully', () => {
      const repo = { open_issues: 0 };
      const expectedResponse = {
        id: "issues",
        href: "/repo/status",
        title: "Issue",
        status: "error",
        description: "There are not enough open issues.",
        extra: "Try creating some more, or asking the community for ideas."
      };

      const result = issues(repo);
      expect(result).toEqual(expectedResponse);
    });

    test('should handle negative open issues gracefully', () => {
      const repo = { open_issues: -1 };
      const expectedResponse = {
        id: "issues",
        href: "/repo/status",
        title: "Issue",
        status: "error",
        description: "There are not enough open issues.",
        extra: "Try creating some more, or asking the community for ideas."
      };

      const result = issues(repo);
      expect(result).toEqual(expectedResponse);
    });
  });
});

// End of unit tests for: issues
