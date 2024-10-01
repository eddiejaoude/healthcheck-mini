
// Unit tests for: goodFirstIssue



import goodFirstIssue from '../../../src/checks/goodFirstIssue';



describe('goodFirstIssue() goodFirstIssue method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    test('should return success status when issues length is greater than min', () => {
      // Arrange
      const issues = [1, 2, 3, 4];

      // Act
      const result = goodFirstIssue(issues);

      // Assert
      expect(result.status).toBe('success');
      expect(result.description).toBe('Great you have open issues with the label good first issue that are ready to be assigned');
      expect(result.extra).toBe('No action required');
    });

    test('should return warning status when issues length is equal to min', () => {
      // Arrange
      const issues = [1, 2, 3];

      // Act
      const result = goodFirstIssue(issues);

      // Assert
      expect(result.status).toBe('warning');
      expect(result.description).toBe('You currently only have 3 issue that has the label good first issue and is not already assigned');
      expect(result.extra).toBe('These need to be open and not already assigned');
    });

    test('should return warning status when issues length is less than min but greater than 0', () => {
      // Arrange
      const issues = [1, 2];

      // Act
      const result = goodFirstIssue(issues);

      // Assert
      expect(result.status).toBe('warning');
      expect(result.description).toBe('You currently only have 2 issue that has the label good first issue and is not already assigned');
      expect(result.extra).toBe('These need to be open and not already assigned');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    test('should return error status when issues array is empty', () => {
      // Arrange
      const issues = [];

      // Act
      const result = goodFirstIssue(issues);

      // Assert
      expect(result.status).toBe('error');
      expect(result.description).toBe('You have no open and unassigned good first issues');
      expect(result.extra).toBe('You will not be appearing in the issue and label search on GitHub');
    });

    test('should return default response when issues is null', () => {
      // Arrange
      const issues = null;

      // Act
      const result = goodFirstIssue(issues);

      // Assert
      expect(result.status).toBe('-');
      expect(result.description).toBe('No data available');
      expect(result.extra).toBe('-');
    });

    test('should return default response when issues is undefined', () => {
      // Arrange
      const issues = undefined;

      // Act
      const result = goodFirstIssue(issues);

      // Assert
      expect(result.status).toBe('-');
      expect(result.description).toBe('No data available');
      expect(result.extra).toBe('-');
    });
  });
});

// End of unit tests for: goodFirstIssue
