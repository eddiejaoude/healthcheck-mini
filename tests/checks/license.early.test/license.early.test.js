
// Unit tests for: license



import license from '../../../src/checks/license';



describe('license() license method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return success when a license is present', () => {
      // Test to ensure the function returns a success response when a license is present
      const communityMetrics = {
        files: {
          license: {
            spdx_id: 'MIT',
          },
        },
      };

      const expectedResponse = {
        id: "license",
        href: "/repo/license",
        title: "License",
        status: "success",
        description: "You have a license MIT.",
        extra: "No action required.",
      };

      const result = license(communityMetrics);
      expect(result).toEqual(expectedResponse);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return error when files object is missing', () => {
      // Test to ensure the function returns an error response when the files object is missing
      const communityMetrics = {};

      const expectedResponse = {
        id: "license",
        href: "/repo/license",
        title: "License",
        status: "error",
        description: "You do not have a license in your repo.",
        extra: "This does not mean it is moe Open Source but less.",
      };

      const result = license(communityMetrics);
      expect(result).toEqual(expectedResponse);
    });

    it('should return error when license is missing in files', () => {
      // Test to ensure the function returns an error response when the license is missing in files
      const communityMetrics = {
        files: {},
      };

      const expectedResponse = {
        id: "license",
        href: "/repo/license",
        title: "License",
        status: "error",
        description: "You do not have a license in your repo.",
        extra: "This does not mean it is moe Open Source but less.",
      };

      const result = license(communityMetrics);
      expect(result).toEqual(expectedResponse);
    });

    it('should return error when files is null', () => {
      // Test to ensure the function returns an error response when files is null
      const communityMetrics = {
        files: null,
      };

      const expectedResponse = {
        id: "license",
        href: "/repo/license",
        title: "License",
        status: "error",
        description: "You do not have a license in your repo.",
        extra: "This does not mean it is moe Open Source but less.",
      };

      const result = license(communityMetrics);
      expect(result).toEqual(expectedResponse);
    });

    it('should return error when files is undefined', () => {
      // Test to ensure the function returns an error response when files is undefined
      const communityMetrics = {
        files: undefined,
      };

      const expectedResponse = {
        id: "license",
        href: "/repo/license",
        title: "License",
        status: "error",
        description: "You do not have a license in your repo.",
        extra: "This does not mean it is moe Open Source but less.",
      };

      const result = license(communityMetrics);
      expect(result).toEqual(expectedResponse);
    });
  });
});

// End of unit tests for: license
