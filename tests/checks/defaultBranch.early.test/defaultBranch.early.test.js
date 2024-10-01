
// Unit tests for: defaultBranch



import defaultBranch from '../../../src/checks/defaultBranch';



describe('defaultBranch() defaultBranch method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    test('should return success response when the default branch is "main"', () => {
      // Arrange: Set up a repo object with the default branch as "main"
      const repo = { default_branch: 'main' };

      // Act: Call the defaultBranch function
      const result = defaultBranch(repo);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'default-branch',
        href: '/repo/status',
        title: 'Default Branch',
        status: 'success',
        description: 'You are using the recommend default branch name.',
        extra: 'No action required.',
      });
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    test('should return warning response when the default branch is not "main"', () => {
      // Arrange: Set up a repo object with a different default branch
      const repo = { default_branch: 'master' };

      // Act: Call the defaultBranch function
      const result = defaultBranch(repo);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'default-branch',
        href: '/repo/status',
        title: 'Default Branch',
        status: 'warning',
        description: 'You are not using the recommended default branch name.',
        extra: 'This may confuse contributors on your project.',
      });
    });

    test('should return warning response when the default branch is an empty string', () => {
      // Arrange: Set up a repo object with an empty string as the default branch
      const repo = { default_branch: '' };

      // Act: Call the defaultBranch function
      const result = defaultBranch(repo);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'default-branch',
        href: '/repo/status',
        title: 'Default Branch',
        status: 'warning',
        description: 'You are not using the recommended default branch name.',
        extra: 'This may confuse contributors on your project.',
      });
    });

    test('should return warning response when the default branch is undefined', () => {
      // Arrange: Set up a repo object with undefined as the default branch
      const repo = { default_branch: undefined };

      // Act: Call the defaultBranch function
      const result = defaultBranch(repo);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'default-branch',
        href: '/repo/status',
        title: 'Default Branch',
        status: 'warning',
        description: 'You are not using the recommended default branch name.',
        extra: 'This may confuse contributors on your project.',
      });
    });

    test('should return warning response when the default branch is null', () => {
      // Arrange: Set up a repo object with null as the default branch
      const repo = { default_branch: null };

      // Act: Call the defaultBranch function
      const result = defaultBranch(repo);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'default-branch',
        href: '/repo/status',
        title: 'Default Branch',
        status: 'warning',
        description: 'You are not using the recommended default branch name.',
        extra: 'This may confuse contributors on your project.',
      });
    });

    test('should return warning response when the default branch is a number', () => {
      // Arrange: Set up a repo object with a number as the default branch
      const repo = { default_branch: 123 };

      // Act: Call the defaultBranch function
      const result = defaultBranch(repo);

      // Assert: Verify the response is as expected
      expect(result).toEqual({
        id: 'default-branch',
        href: '/repo/status',
        title: 'Default Branch',
        status: 'warning',
        description: 'You are not using the recommended default branch name.',
        extra: 'This may confuse contributors on your project.',
      });
    });
  });
});

// End of unit tests for: defaultBranch
