// Unit tests for: apiRequest

import { apiRequest } from "../../../../src/lib/github/apiRequest";

// Mocking the global fetch function
global.fetch = jest.fn();

describe("apiRequest() apiRequest method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path Tests
  describe("Happy Path", () => {
    it("should return data when fetch is successful", async () => {
      // Arrange: Mock fetch to return a successful response
      const mockData = { key: "value" };
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      // Act: Call the apiRequest function
      const result = await apiRequest<typeof mockData>(
        "https://api.example.com/data"
      );

      // Assert: Verify the result is as expected
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/data", {
        next: { revalidate: 3600 },
      });
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should throw an error when fetch fails", async () => {
      // Arrange: Mock fetch to throw an error
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      // Act & Assert: Call the apiRequest function and expect an error
      await expect(apiRequest("https://api.example.com/data")).rejects.toThrow(
        "Invalid URL"
      );
    });

    it("should throw an error when response is not JSON", async () => {
      // Arrange: Mock fetch to return a non-JSON response
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON")),
      });

      // Act & Assert: Call the apiRequest function and expect an error
      await expect(apiRequest("https://api.example.com/data")).rejects.toThrow(
        "Invalid URL"
      );
    });
  });
});

// End of unit tests for: apiRequest
