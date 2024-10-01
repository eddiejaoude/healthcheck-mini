
// Unit tests for: release


import { differenceInDays } from "date-fns";
import release from '../../../src/checks/release';



jest.mock("date-fns", () => ({
  differenceInDays: jest.fn(),
}));

describe('release() release method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
   it('should return success when the release is recent (<= 30 days)', () => {
     // Arrange
     const releaseData = { created_at: '2023-09-01' };
     differenceInDays.mockReturnValue(20);

     // Act
     const result = release(releaseData);

     // Assert
     expect(result).toEqual({
       id: 'release',
       href: '/repo/status',
       title: 'Release',
       status: 'success',
       description: 'Your project has a recent release.',
       extra: 'No action required.',
     });
   });

   it('should return warning when the release is between 31 and 89 days', () => {
     // Arrange
     const releaseData = { created_at: '2023-07-01' };
     differenceInDays.mockReturnValue(60);

     // Act
     const result = release(releaseData);

     // Assert
     expect(result).toEqual({
       id: 'release',
       href: '/repo/status',
       title: 'Release',
       status: 'warning',
       description: 'Your project might need a more recent release.',
       extra: 'Are there any improvments you wish to collect together and release?',
     });
   });

   it('should return error when the release is 90 or more days old', () => {
     // Arrange
     const releaseData = { created_at: '2023-05-01' };
     differenceInDays.mockReturnValue(100);

     // Act
     const result = release(releaseData);

     // Assert
     expect(result).toEqual({
       id: 'release',
       href: '/repo/status',
       title: 'Release',
       status: 'error',
       description: 'There has been no release for 100 days.',
       extra: 'Are there any features or bugs that can be implemented?',
     });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return error when created_at is not provided', () => {
      // Arrange
      const releaseData = {};

      // Act
      const result = release(releaseData);

      // Assert
      expect(result).toEqual({
        id: 'release',
        href: '/repo/status',
        title: 'Release',
        status: 'error',
        description: 'There are no releases.',
        extra: 'If your project is ready for people to use, it is recommended to create a release.',
      });
    });

   it('should return success when the release is exactly 30 days old', () => {
     // Arrange
     const releaseData = { created_at: '2023-09-01' };
     differenceInDays.mockReturnValue(30);

     // Act
     const result = release(releaseData);

     // Assert
     expect(result).toEqual({
       id: 'release',
       href: '/repo/status',
       title: 'Release',
       status: 'success',
       description: 'Your project has a recent release.',
       extra: 'No action required.',
     });
   });

   it('should return warning when the release is exactly 31 days old', () => {
     // Arrange
     const releaseData = { created_at: '2023-08-31' };
     differenceInDays.mockReturnValue(31);

     // Act
     const result = release(releaseData);

     // Assert
     expect(result).toEqual({
       id: 'release',
       href: '/repo/status',
       title: 'Release',
       status: 'warning',
       description: 'Your project might need a more recent release.',
       extra: 'Are there any improvments you wish to collect together and release?',
     });
   });

   it('should return error when the release is exactly 90 days old', () => {
     // Arrange
     const releaseData = { created_at: '2023-06-01' };
     differenceInDays.mockReturnValue(90);

     // Act
     const result = release(releaseData);

     // Assert
     expect(result).toEqual({
       id: 'release',
       href: '/repo/status',
       title: 'Release',
       status: 'error',
       description: 'There has been no release for 90 days.',
       extra: 'Are there any features or bugs that can be implemented?',
     });
   });
  });
});

// End of unit tests for: release
