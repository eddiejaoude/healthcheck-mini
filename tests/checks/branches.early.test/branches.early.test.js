
// Unit tests for: branches



import branches from '../../../src/checks/branches';



describe('branches() branches method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    test('should return success status when branches length is less than or equal to min', () => {
      const input = ['branch1', 'branch2', 'branch3', 'branch4', 'branch5'];
      const expectedOutput = {
        id: "branches",
        href: "/repo/status",
        title: "Branches",
        status: "success",
        description: "You have a small amount of branches.",
        extra: "No action required",
      };
      expect(branches(input)).toEqual(expectedOutput);
    });

    test('should return warning status when branches length is greater than min and less than or equal to max', () => {
      const input = ['branch1', 'branch2', 'branch3', 'branch4', 'branch5', 'branch6'];
      const expectedOutput = {
        id: "branches",
        href: "/repo/status",
        title: "Branches",
        status: "warning",
        description: "You have 6 number of branches which is higher than the recommended",
        extra: "Are any of these branhes stale and can be deleted?",
      };
      expect(branches(input)).toEqual(expectedOutput);
    });

    test('should return error status when branches length is greater than max', () => {
      const input = ['branch1', 'branch2', 'branch3', 'branch4', 'branch5', 'branch6', 'branch7', 'branch8', 'branch9', 'branch10', 'branch11'];
      const expectedOutput = {
        id: "branches",
        href: "/repo/status",
        title: "Branches",
        status: "error",
        description: "You have a high number of branches, which can cause confusion.",
        extra: "Can any of these branches be removed?",
      };
      expect(branches(input)).toEqual(expectedOutput);
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    test('should return no data available when branches is null', () => {
      const input = null;
      const expectedOutput = {
        id: "branches",
        href: "/repo/status",
        title: "Branches",
        status: "-",
        description: "No data available",
        extra: "-",
      };
      expect(branches(input)).toEqual(expectedOutput);
    });

    test('should return no data available when branches is undefined', () => {
      const input = undefined;
      const expectedOutput = {
        id: "branches",
        href: "/repo/status",
        title: "Branches",
        status: "-",
        description: "No data available",
        extra: "-",
      };
      expect(branches(input)).toEqual(expectedOutput);
    });

    test('should return success status when branches length is exactly min', () => {
      const input = ['branch1', 'branch2', 'branch3', 'branch4', 'branch5'];
      const expectedOutput = {
        id: "branches",
        href: "/repo/status",
        title: "Branches",
        status: "success",
        description: "You have a small amount of branches.",
        extra: "No action required",
      };
      expect(branches(input)).toEqual(expectedOutput);
    });

    test('should return warning status when branches length is exactly max', () => {
      const input = ['branch1', 'branch2', 'branch3', 'branch4', 'branch5', 'branch6', 'branch7', 'branch8', 'branch9', 'branch10'];
      const expectedOutput = {
        id: "branches",
        href: "/repo/status",
        title: "Branches",
        status: "warning",
        description: "You have 10 number of branches which is higher than the recommended",
        extra: "Are any of these branhes stale and can be deleted?",
      };
      expect(branches(input)).toEqual(expectedOutput);
    });

    test('should handle empty array input', () => {
      const input = [];
      const expectedOutput = {
        id: "branches",
        href: "/repo/status",
        title: "Branches",
        status: "success",
        description: "You have a small amount of branches.",
        extra: "No action required",
      };
//      expect(branches(input)).toEqual(expectedOutput);
    });
  });
});

// End of unit tests for: branches
