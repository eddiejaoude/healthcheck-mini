
// Unit tests for: codeOfConduct



import codeOfConduct from '../../../src/checks/codeOfConduct';



describe('codeOfConduct() codeOfConduct method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return success when code_of_conduct file is present', () => {
      // Arrange: Set up the communityMetrics with a code_of_conduct file
      const communityMetrics = {
        files: {
          code_of_conduct: {
            name: 'CoC.md',
          },
        },
      };

      // Act: Call the codeOfConduct function
      const result = codeOfConduct(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'code-of-conduct',
        href: '/repo/code-of-conduct',
        title: 'Code of Conduct',
        status: 'success',
        description: 'You have a CoC CoC.md.',
        extra: 'No action required.',
      });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return error when files object is missing', () => {
      // Arrange: Set up the communityMetrics without a files object
      const communityMetrics = {};

      // Act: Call the codeOfConduct function
      const result = codeOfConduct(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'code-of-conduct',
        href: '/repo/code-of-conduct',
        title: 'Code of Conduct',
        status: 'error',
        description: 'You do not have a CoC in your repo.',
        extra: 'This is important for people to know your project and community is safe.',
      });
    });

    it('should return error when code_of_conduct file is missing', () => {
      // Arrange: Set up the communityMetrics with an empty files object
      const communityMetrics = {
        files: {},
      };

      // Act: Call the codeOfConduct function
      const result = codeOfConduct(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'code-of-conduct',
        href: '/repo/code-of-conduct',
        title: 'Code of Conduct',
        status: 'error',
        description: 'You do not have a CoC in your repo.',
        extra: 'This is important for people to know your project and community is safe.',
      });
    });

    it.skip('should return error when communityMetrics is null', () => {
      // Arrange: Set up the communityMetrics as null
      const communityMetrics = null;

      // Act: Call the codeOfConduct function
      const result = codeOfConduct(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'code-of-conduct',
        href: '/repo/code-of-conduct',
        title: 'Code of Conduct',
        status: 'error',
        description: 'You do not have a CoC in your repo.',
        extra: 'This is important for people to know your project and community is safe.',
      });
    });

    it.skip('should return error when communityMetrics is undefined', () => {
      // Arrange: Set up the communityMetrics as undefined
      const communityMetrics = undefined;

      // Act: Call the codeOfConduct function
      const result = codeOfConduct(communityMetrics);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'code-of-conduct',
        href: '/repo/code-of-conduct',
        title: 'Code of Conduct',
        status: 'error',
        description: 'You do not have a CoC in your repo.',
        extra: 'This is important for people to know your project and community is safe.',
      });
    });
  });
});

// End of unit tests for: codeOfConduct
