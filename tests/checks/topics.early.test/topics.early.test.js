
// Unit tests for: topics



import topics from '../../../src/checks/topics';



describe('topics() topics method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    test('should return success when topics length is between min and max', () => {
      const repo = { topics: ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6'] };
      const result = topics(repo);
      expect(result.status).toBe('success');
      expect(result.description).toBe('You have a good number of repo topics.');
      expect(result.extra).toBe('No action required.');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    test('should return error when topics is exactly 0', () => {
      const repo = { topics: [] };
      const result = topics(repo);
      expect(result.status).toBe('error');
      expect(result.description).toBe('There are no repo topics at the top right.');
      expect(result.extra).toBe('It is important to be discoverable using topics.');
    });

    test('should return warning when topics length is less than min', () => {
      const repo = { topics: ['topic1', 'topic2', 'topic3', 'topic4', 'topic5'] };
      const result = topics(repo);
      expect(result.status).toBe('warning');
      expect(result.description).toBe('You should add some more topics.');
      expect(result.extra).toBe('Try to include more topics.');
    });

    test('should return warning when topics length is more than max', () => {
      const repo = { topics: ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6', 'topic7', 'topic8', 'topic9', 'topic10', 'topic11', 'topic12', 'topic13'] };
      const result = topics(repo);
      expect(result.status).toBe('warning');
      expect(result.description).toBe('You may have too many topics.');
      expect(result.extra).toBe('Try reducing the amount of your topics.');
    });

    test('should return success when topics length is exactly min', () => {
      const repo = { topics: ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6'] };
      const result = topics(repo);
      expect(result.status).toBe('success');
      expect(result.description).toBe('You have a good number of repo topics.');
      expect(result.extra).toBe('No action required.');
    });

    test('should return success when topics length is exactly max', () => {
      const repo = { topics: ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6', 'topic7', 'topic8', 'topic9', 'topic10', 'topic11', 'topic12'] };
      const result = topics(repo);
      expect(result.status).toBe('success');
      expect(result.description).toBe('You have a good number of repo topics.');
      expect(result.extra).toBe('No action required.');
    });
  });
});

// End of unit tests for: topics
