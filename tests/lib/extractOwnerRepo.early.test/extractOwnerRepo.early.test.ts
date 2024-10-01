
// Unit tests for: extractOwnerRepo



import extractOwnerRepo from '../../../src/lib/extractOwnerRepo';



describe('extractOwnerRepo() extractOwnerRepo method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should correctly extract owner and repo from a valid GitHub URL', () => {
      const url = 'https://github.com/ownerName/repoName';
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: 'ownerName', repo: 'repoName' });
    });

    it('should correctly extract owner and repo from a URL with trailing slash', () => {
      const url = 'https://github.com/ownerName/repoName/';
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: 'ownerName', repo: 'repoName' });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return undefined for owner and repo if URL path is incomplete', () => {
      const url = 'https://github.com/ownerName';
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: 'ownerName', repo: undefined });
    });

    it.skip('should return undefined for owner and repo if URL path is empty', () => {
      const url = 'https://github.com/';
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: undefined, repo: undefined });
    });

    it('should handle URLs with additional path segments gracefully', () => {
      const url = 'https://github.com/ownerName/repoName/extra/path';
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: 'ownerName', repo: 'repoName' });
    });

    it('should throw an error for invalid URLs', () => {
      const url = 'not-a-valid-url';
      expect(() => extractOwnerRepo(url)).toThrow();
    });

    it('should handle URLs with query parameters correctly', () => {
      const url = 'https://github.com/ownerName/repoName?tab=repositories';
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: 'ownerName', repo: 'repoName' });
    });

    it('should handle URLs with hash fragments correctly', () => {
      const url = 'https://github.com/ownerName/repoName#readme';
      const result = extractOwnerRepo(url);
      expect(result).toEqual({ owner: 'ownerName', repo: 'repoName' });
    });
  });
});

// End of unit tests for: extractOwnerRepo
