
// Unit tests for: pullRequestTemplate



import pullRequestTemplate from '../../../src/checks/pullRequestTemplate';



describe('pullRequestTemplate() pullRequestTemplate method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return success when pull_request_template file exists', () => {
      // Arrange: Set up the communityMetrics with a pull_request_template file
      const communityMetrics = {
        files: {
          pull_request_template: true,
        },
      };

      // Act: Call the function with the arranged data
      const result = pullRequestTemplate(communityMetrics);

      // Assert: Verify the function returns the expected success response
      expect(result).toEqual({
        id: "pull-request-template",
        href: "/repo/pull-request-template",
        title: "Pull Request template",
        status: "success",
        description: "You have a Pull Request template.",
        extra: "No action required.",
      });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it.skip('should return error when communityMetrics is undefined', () => {
      // Arrange: Set communityMetrics to undefined
      const communityMetrics = undefined;

      // Act: Call the function with undefined
      const result = pullRequestTemplate(communityMetrics);

      // Assert: Verify the function returns the expected error response
      expect(result).toEqual({
        id: "pull-request-template",
        href: "/repo/pull-request-template",
        title: "Pull Request template",
        status: "error",
        description: "You do not have a pull request template in your repo.",
        extra: "This helps people create better pull requests.",
      });
    });

    it('should return error when communityMetrics.files is undefined', () => {
      // Arrange: Set communityMetrics with files as undefined
      const communityMetrics = {
        files: undefined,
      };

      // Act: Call the function with files undefined
      const result = pullRequestTemplate(communityMetrics);

      // Assert: Verify the function returns the expected error response
      expect(result).toEqual({
        id: "pull-request-template",
        href: "/repo/pull-request-template",
        title: "Pull Request template",
        status: "error",
        description: "You do not have a pull request template in your repo.",
        extra: "This helps people create better pull requests.",
      });
    });

    it('should return error when pull_request_template file does not exist', () => {
      // Arrange: Set up the communityMetrics without a pull_request_template file
      const communityMetrics = {
        files: {
          pull_request_template: false,
        },
      };

      // Act: Call the function with the arranged data
      const result = pullRequestTemplate(communityMetrics);

      // Assert: Verify the function returns the expected error response
      expect(result).toEqual({
        id: "pull-request-template",
        href: "/repo/pull-request-template",
        title: "Pull Request template",
        status: "error",
        description: "You do not have a pull request template in your repo.",
        extra: "This helps people create better pull requests.",
      });
    });

    it('should return error when files object is empty', () => {
      // Arrange: Set up the communityMetrics with an empty files object
      const communityMetrics = {
        files: {},
      };

      // Act: Call the function with the arranged data
      const result = pullRequestTemplate(communityMetrics);

      // Assert: Verify the function returns the expected error response
      expect(result).toEqual({
        id: "pull-request-template",
        href: "/repo/pull-request-template",
        title: "Pull Request template",
        status: "error",
        description: "You do not have a pull request template in your repo.",
        extra: "This helps people create better pull requests.",
      });
    });
  });
});

// End of unit tests for: pullRequestTemplate
