
// Unit tests for: issueTemplates



import issueTemplates from '../../../src/checks/issueTemplates';



describe('issueTemplates() issueTemplates method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return success status when issue_template file exists', () => {
      // Arrange: Set up the communityMetrics object with issue_template
      const communityMetrics = {
        files: {
          issue_template: true
        }
      };

      // Act: Call the issueTemplates function
      const result = issueTemplates(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "issue-templates",
        href: "/repo/issue-templates",
        title: "Issue templates",
        status: "success",
        description: "You have issue templates.",
        extra: "No action required."
      });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return error status when issue_template file does not exist', () => {
      // Arrange: Set up the communityMetrics object without issue_template
      const communityMetrics = {
        files: {
          issue_template: false
        }
      };

      // Act: Call the issueTemplates function
      const result = issueTemplates(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "issue-templates",
        href: "/repo/issue-templates",
        title: "Issue templates",
        status: "error",
        description: "You do not have any issue templates in your repo.",
        extra: "This helps people create better issues, for example focused on a feature or bug."
      });
    });

    it('should return error status when files object is empty', () => {
      // Arrange: Set up the communityMetrics object with an empty files object
      const communityMetrics = {
        files: {}
      };

      // Act: Call the issueTemplates function
      const result = issueTemplates(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "issue-templates",
        href: "/repo/issue-templates",
        title: "Issue templates",
        status: "error",
        description: "You do not have any issue templates in your repo.",
        extra: "This helps people create better issues, for example focused on a feature or bug."
      });
    });

    it('should return error status when files object is undefined', () => {
      // Arrange: Set up the communityMetrics object with undefined files
      const communityMetrics = {};

      // Act: Call the issueTemplates function
      const result = issueTemplates(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "issue-templates",
        href: "/repo/issue-templates",
        title: "Issue templates",
        status: "error",
        description: "You do not have any issue templates in your repo.",
        extra: "This helps people create better issues, for example focused on a feature or bug."
      });
    });
  });
});

// End of unit tests for: issueTemplates
