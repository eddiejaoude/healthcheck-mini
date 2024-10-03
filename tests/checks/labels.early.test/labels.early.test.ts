// Unit tests for: labels

import { Label } from "@/models/github/label";
import { StatusCheck } from "@/types/checks";
import labels from "../../../src/checks/labels";

describe("labels() labels method", () => {
  // Happy path tests
  describe("Happy Path", () => {
    it("should return success when labels length is equal to max", () => {
      // Test aims to verify the success status when labels length is at the maximum threshold
      const testLabels: Label[] = Array(12).fill({
        id: 1,
        node_id: "node1",
        url: "http://example.com",
        name: "label",
        color: "ffffff",
        default: false,
        description: "A label",
      });

      const expected: StatusCheck = {
        title: "Labels",
        status: "success",
        description: "You have multiple custom labels.",
        extra: "No action required.",
      };

      expect(labels(testLabels)).toEqual(expected);
    });

    it("should return warning when labels length is between min and max", () => {
      // Test aims to verify the warning status when labels length is between min and max
      const testLabels: Label[] = Array(5).fill({
        id: 1,
        node_id: "node1",
        url: "http://example.com",
        name: "label",
        color: "ffffff",
        default: false,
        description: "A label",
      });

      const expected: StatusCheck = {
        title: "Labels",
        status: "warning",
        description: "You might need more custom labels.",
        extra: "Try creating some more, have a look at other repos for ideas.",
      };

      expect(labels(testLabels)).toEqual(expected);
    });

    it("should return error when labels length is less than or equal to min", () => {
      // Test aims to verify the error status when labels length is less than or equal to the minimum threshold
      const testLabels: Label[] = Array(3).fill({
        id: 1,
        node_id: "node1",
        url: "http://example.com",
        name: "label",
        color: "ffffff",
        default: false,
        description: "A label",
      });

      const expected: StatusCheck = {
        title: "Labels",
        status: "error",
        description: "There are not enough custom labels.",
        extra: "This is useful for filtering issues.",
      };

      expect(labels(testLabels)).toEqual(expected);
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should return error when labels length is zero", () => {
      // Test aims to verify the error status when there are no labels
      const testLabels: Label[] = [];

      const expected: StatusCheck = {
        title: "Labels",
        status: "error",
        description: "There are not enough custom labels.",
        extra: "This is useful for filtering issues.",
      };

      expect(labels(testLabels)).toEqual(expected);
    });

    it("should return success when labels length is greater than max", () => {
      // Test aims to verify the success status when labels length exceeds the maximum threshold
      const testLabels: Label[] = Array(15).fill({
        id: 1,
        node_id: "node1",
        url: "http://example.com",
        name: "label",
        color: "ffffff",
        default: false,
        description: "A label",
      });

      const expected: StatusCheck = {
        title: "Labels",
        status: "success",
        description: "You have multiple custom labels.",
        extra: "No action required.",
      };

      expect(labels(testLabels)).toEqual(expected);
    });

    it("should return warning when labels length is just above min", () => {
      // Test aims to verify the warning status when labels length is just above the minimum threshold
      const testLabels: Label[] = Array(4).fill({
        id: 1,
        node_id: "node1",
        url: "http://example.com",
        name: "label",
        color: "ffffff",
        default: false,
        description: "A label",
      });

      const expected: StatusCheck = {
        title: "Labels",
        status: "warning",
        description: "You might need more custom labels.",
        extra: "Try creating some more, have a look at other repos for ideas.",
      };

      expect(labels(testLabels)).toEqual(expected);
    });

    it("should return warning when labels length is just below max", () => {
      // Test aims to verify the warning status when labels length is just below the maximum threshold
      const testLabels: Label[] = Array(11).fill({
        id: 1,
        node_id: "node1",
        url: "http://example.com",
        name: "label",
        color: "ffffff",
        default: false,
        description: "A label",
      });

      const expected: StatusCheck = {
        title: "Labels",
        status: "warning",
        description: "You might need more custom labels.",
        extra: "Try creating some more, have a look at other repos for ideas.",
      };

      expect(labels(testLabels)).toEqual(expected);
    });
  });
});

// End of unit tests for: labels
