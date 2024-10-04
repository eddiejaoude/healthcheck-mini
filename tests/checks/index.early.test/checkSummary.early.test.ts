// Unit tests for: checkSummary

import { checkSummary } from "@/checks/index";

// Mocking the necessary functions
jest.mock("@/checks/description");

jest.mock("@/checks/url");

jest.mock("@/checks/topics", () => {
  const actual = jest.requireActual("@/checks/topics");
  return {
    ...actual,
    topics: jest.fn(),
  };
});

jest.mock("@/checks/activity");
jest.mock("@/checks/issues");
jest.mock("@/checks/defaultBranch");
jest.mock("@/checks/goodFirstIssue");
jest.mock("@/checks/branches");
jest.mock("@/checks/release");
jest.mock("@/checks/readme");
jest.mock("@/checks/license");
jest.mock("@/checks/contributing");
jest.mock("@/checks/pullRequestTemplate");
jest.mock("@/checks/codeOfConduct");
jest.mock("@/checks/labels");

// MockStatusCheck interface
interface MockStatusCheck {
  status: "success" | "warning" | "error";
}

// Test suite for checkSummary
describe("checkSummary() checkSummary method", () => {
  // Happy path tests
  describe("Happy Path", () => {
    it("should return correct summary for all success statuses", () => {
      const checks: MockStatusCheck[] = [
        { status: "success" },
        { status: "success" },
        { status: "success" },
      ] as any;

      const result = checkSummary(checks as any);
      expect(result).toEqual({ success: 3, warning: 0, error: 0 });
    });

    it("should return correct summary for mixed statuses", () => {
      const checks: MockStatusCheck[] = [
        { status: "success" },
        { status: "warning" },
        { status: "error" },
      ] as any;

      const result = checkSummary(checks as any);
      expect(result).toEqual({ success: 1, warning: 1, error: 1 });
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should return zero for all categories when checks array is empty", () => {
      const checks: MockStatusCheck[] = [] as any;

      const result = checkSummary(checks as any);
      expect(result).toEqual({ success: 0, warning: 0, error: 0 });
    });

    it("should handle undefined status gracefully", () => {
      const checks: MockStatusCheck[] = [
        { status: "success" },
        { status: undefined },
      ] as any;

      const result = checkSummary(checks as any);
      expect(result).toEqual({ success: 1, warning: 0, error: 0 });
    });

    it("should handle null status gracefully", () => {
      const checks: MockStatusCheck[] = [
        { status: "success" },
        { status: null },
      ] as any;

      const result = checkSummary(checks as any);
      expect(result).toEqual({ success: 1, warning: 0, error: 0 });
    });
  });
});

// End of unit tests for: checkSummary
