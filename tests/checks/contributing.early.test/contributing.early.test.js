
// Unit tests for: contributing



import contributing from '../../../src/checks/contributing';



describe('contributing() contributing method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return success when contributing guide is present', () => {
      // Arrange: Set up the communityMetrics with a contributing guide
      const communityMetrics = {
        files: {
          contributing: true,
        },
      };

      // Act: Call the contributing function
      const result = contributing(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "contributing",
        href: "/repo/contributing",
        title: "Contributing",
        status: "success",
        description: "You have a contributing guide.",
        extra: "No action required.",
      });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return error when files object is missing', () => {
      // Arrange: Set up the communityMetrics without a files object
      const communityMetrics = {};

      // Act: Call the contributing function
      const result = contributing(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "contributing",
        href: "/repo/contributing",
        title: "Contributing",
        status: "error",
        description: "You do not have a contributing guide in your repo.",
        extra: "This is important, so people know how to get started with your project.",
      });
    });

    it('should return error when contributing guide is not present', () => {
      // Arrange: Set up the communityMetrics with files object but without contributing guide
      const communityMetrics = {
        files: {},
      };

      // Act: Call the contributing function
      const result = contributing(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "contributing",
        href: "/repo/contributing",
        title: "Contributing",
        status: "error",
        description: "You do not have a contributing guide in your repo.",
        extra: "This is important, so people know how to get started with your project.",
      });
    });

    it('should return error when files object is null', () => {
      // Arrange: Set up the communityMetrics with a null files object
      const communityMetrics = {
        files: null,
      };

      // Act: Call the contributing function
      const result = contributing(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: "contributing",
        href: "/repo/contributing",
        title: "Contributing",
        status: "error",
        description: "You do not have a contributing guide in your repo.",
        extra: "This is important, so people know how to get started with your project.",
      });
    });
  });
});

// End of unit tests for: contributing
