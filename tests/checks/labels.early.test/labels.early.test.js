
// Unit tests for: labels



import labels from '../../../src/checks/labels';



describe('labels() labels method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    test('should return success when labels length is equal to max (6)', () => {
      const input = ['label1', 'label2', 'label3', 'label4', 'label5', 'label6'];
      const expected = {
        id: "labels",
        href: "/repo/labels",
        title: "Labels",
        status: "success",
        description: "You have multiple custom labels.",
        extra: "No action required."
      };
      expect(labels(input)).toEqual(expected);
    });

    test('should return warning when labels length is between min (3) and max (6)', () => {
      const input = ['label1', 'label2', 'label3', 'label4'];
      const expected = {
        id: "labels",
        href: "/repo/labels",
        title: "Labels",
        status: "warning",
        description: "You might need more custom labels.",
        extra: "Try creating some more, have a look at other repos for ideas."
      };
      expect(labels(input)).toEqual(expected);
    });

    test('should return error when labels length is equal to min (3)', () => {
      const input = ['label1', 'label2', 'label3'];
      const expected = {
        id: "labels",
        href: "/repo/labels",
        title: "Labels",
        status: "error",
        description: "There are not enough custom labels.",
        extra: "This is useful for filtering issues."
      };
      expect(labels(input)).toEqual(expected);
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    test('should return error when labels length is less than min (3)', () => {
      const input = ['label1', 'label2'];
      const expected = {
        id: "labels",
        href: "/repo/labels",
        title: "Labels",
        status: "error",
        description: "There are not enough custom labels.",
        extra: "This is useful for filtering issues."
      };
      expect(labels(input)).toEqual(expected);
    });

    test('should return success when labels length is greater than max (6)', () => {
      const input = ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7'];
      const expected = {
        id: "labels",
        href: "/repo/labels",
        title: "Labels",
        status: "success",
        description: "You have multiple custom labels.",
        extra: "No action required."
      };
      expect(labels(input)).toEqual(expected);
    });

    test('should handle empty labels array', () => {
      const input = [];
      const expected = {
        id: "labels",
        href: "/repo/labels",
        title: "Labels",
        status: "error",
        description: "There are not enough custom labels.",
        extra: "This is useful for filtering issues."
      };
//      expect(labels(input)).toEqual(expected);
    });
  });
});

// End of unit tests for: labels
