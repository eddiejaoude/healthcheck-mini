
// Unit tests for: activity


import { differenceInDays } from "date-fns";
import activity from '../../../src/checks/activity';



jest.mock("date-fns", () => ({
  differenceInDays: jest.fn(),
}));

describe('activity() activity method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    test('should return success status when the project is active (diff <= 7)', () => {
      // Arrange
      const repo = { pushed_at: '2023-10-01T00:00:00Z' };
      differenceInDays.mockReturnValue(5);

      // Act
      const result = activity(repo);

      // Assert
      expect(result).toEqual({
        id: 'activity',
        href: '/repo/status',
        title: 'Activity',
        status: 'success',
        description: 'Your project is active.',
        extra: 'No action required.',
      });
    });

    test('should return warning status when the project needs more recent activity (7 < diff < 30)', () => {
      // Arrange
      const repo = { pushed_at: '2023-09-15T00:00:00Z' };
      differenceInDays.mockReturnValue(20);

      // Act
      const result = activity(repo);

      // Assert
      expect(result).toEqual({
        id: 'activity',
        href: '/repo/status',
        title: 'Activity',
        status: 'warning',
        description: 'Your project needs more recent activity.',
        extra: 'Are there any bugs that can be fixed?',
      });
    });

    test('should return error status when there has been no activity for 30 or more days (diff >= 30)', () => {
      // Arrange
      const repo = { pushed_at: '2023-08-01T00:00:00Z' };
      differenceInDays.mockReturnValue(45);

      // Act
      const result = activity(repo);

      // Assert
      expect(result).toEqual({
        id: 'activity',
        href: '/repo/status',
        title: 'Activity',
        status: 'error',
        description: 'There has been no activity for 45 days.',
        extra: 'Are there any features that can be implemented?',
      });
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    test('should return success status when diff is exactly 7 days', () => {
      // Arrange
      const repo = { pushed_at: '2023-09-30T00:00:00Z' };
      differenceInDays.mockReturnValue(7);

      // Act
      const result = activity(repo);

      // Assert
      expect(result.status).toBe('success');
    });

    test('should return warning status when diff is exactly 8 days', () => {
      // Arrange
      const repo = { pushed_at: '2023-09-29T00:00:00Z' };
      differenceInDays.mockReturnValue(8);

      // Act
      const result = activity(repo);

      // Assert
      expect(result.status).toBe('warning');
    });

    test('should return warning status when diff is exactly 29 days', () => {
      // Arrange
      const repo = { pushed_at: '2023-09-08T00:00:00Z' };
      differenceInDays.mockReturnValue(29);

      // Act
      const result = activity(repo);

      // Assert
      expect(result.status).toBe('warning');
    });

    test('should return error status when diff is exactly 30 days', () => {
      // Arrange
      const repo = { pushed_at: '2023-09-07T00:00:00Z' };
      differenceInDays.mockReturnValue(30);

      // Act
      const result = activity(repo);

      // Assert
      expect(result.status).toBe('error');
    });
  });
});

// End of unit tests for: activity
