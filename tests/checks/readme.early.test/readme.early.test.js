
// Unit tests for: readme



import readme from '../../../src/checks/readme';



describe('readme() readme method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    it('should return success when a README file is present', () => {
      // Arrange: Set up the communityMetrics object with a README file
      const communityMetrics = {
        files: {
          readme: true
        }
      };

      // Act: Call the readme function
      const result = readme(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "readme",
        href: "/repo/readme",
        title: "Readme",
        status: "success",
        description: "You have a README file.",
        extra: "No action required."
      });
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should return error when files object is missing', () => {
      // Arrange: Set up the communityMetrics object without files
      const communityMetrics = {};

      // Act: Call the readme function
      const result = readme(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "readme",
        href: "/repo/readme",
        title: "Readme",
        status: "error",
        description: "You do not have a readme.md file in your repo.",
        extra: "This is the most important file in your project."
      });
    });

    it('should return error when files object is present but README is missing', () => {
      // Arrange: Set up the communityMetrics object with files but without README
      const communityMetrics = {
        files: {}
      };

      // Act: Call the readme function
      const result = readme(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "readme",
        href: "/repo/readme",
        title: "Readme",
        status: "error",
        description: "You do not have a readme.md file in your repo.",
        extra: "This is the most important file in your project."
      });
    });

    it('should return error when files object is null', () => {
      // Arrange: Set up the communityMetrics object with files as null
      const communityMetrics = {
        files: null
      };

      // Act: Call the readme function
      const result = readme(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "readme",
        href: "/repo/readme",
        title: "Readme",
        status: "error",
        description: "You do not have a readme.md file in your repo.",
        extra: "This is the most important file in your project."
      });
    });
  });
});

// End of unit tests for: readme
