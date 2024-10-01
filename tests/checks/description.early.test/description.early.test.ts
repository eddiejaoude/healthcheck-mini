
// Unit tests for: description


//import description from '@/path/to/description';
import description from "@/checks/description";
import { StatusCheck } from "@/types/checks";


// MockRepo interface to simulate the Repo class
interface MockRepo {
  description?: string;
  homepage?: string;
}

describe('description() description method', () => {
  let mockRepo: MockRepo;

  beforeEach(() => {
    mockRepo = {
      description: '',
      homepage: '',
    };
  });

  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return success status when description is present', () => {
      // Test aims to verify that a valid description results in a success status
      mockRepo.description = 'This is a valid description';

      const result: StatusCheck = description(mockRepo as any);

      expect(result.status).toBe('success');
      expect(result.description).toBe('You have a repo description.');
      expect(result.extra).toBe('No action required.');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it.skip('should return error status when description is missing', () => {
      // Test aims to verify that a missing description results in an error status
      mockRepo.description = '';

      const result: StatusCheck = description(mockRepo as any);

      expect(result.status).toBe('error');
      expect(result.description).toBe('There is no repo description at the top right.');
      expect(result.extra).toBe('It is important to write a concise description about your repo.');
    });

    it('should return warning status when description is too short', () => {
      // Test aims to verify that a short description results in a warning status
      mockRepo.description = 'Short';

      const result: StatusCheck = description(mockRepo as any);

      expect(result.status).toBe('warning');
      expect(result.description).toBe('Your description may be too short.');
      expect(result.extra).toBe('Try to include more information.');
    });

    it('should return warning status when description is too long', () => {
      // Test aims to verify that a long description results in a warning status
      mockRepo.description = 'L'.repeat(201);

      const result: StatusCheck = description(mockRepo as any);

      expect(result.status).toBe('warning');
      expect(result.description).toBe('Your description may be too long.');
      expect(result.extra).toBe('Try reducing the length of your description.');
    });

    it('should return warning status when description contains homepage URL', () => {
      // Test aims to verify that a description containing the homepage URL results in a warning status
      mockRepo.description = 'This is a description with a URL';
      mockRepo.homepage = 'URL';

      const result: StatusCheck = description(mockRepo as any);

      expect(result.status).toBe('warning');
      expect(result.description).toBe('Your description contains a duplicate of the url.');
      expect(result.extra).toBe('You can remove the url from the description.');
    });
  });
});

// End of unit tests for: description
