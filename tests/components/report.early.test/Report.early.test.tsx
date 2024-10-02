// Unit tests for: Report

import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Report from "@/components/report";

// Mock components and icons
jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("lucide-react", () => ({
  CheckCircle2: () => <span>CheckCircle2 Icon</span>,
  XCircle: () => <span>XCircle Icon</span>,
  AlertCircle: () => <span>AlertCircle Icon</span>,
}));

jest.mock("../../../src/components/ui/progress", () => ({
  Progress: ({ value }: { value: number }) => <div>Progress: {value}%</div>,
}));

// Mock ReportType
interface MockReportType {
  repoUrl: string;
  statusChecks: {
    score: number;
    summary: {
      success: number;
      warning: number;
      error: number;
    };
    allChecks: Array<{
      status: "success" | "warning" | "error";
      title: string;
      description: string;
    }>;
  };
}

describe("Report() Report method", () => {
  describe("Happy Path", () => {
    it("should render the report with all checks passed", () => {
      const mockReport: MockReportType = {
        repoUrl: "https://github.com/example/repo",
        statusChecks: {
          score: 100,
          summary: {
            success: 3,
            warning: 0,
            error: 0,
          },
          allChecks: [
            {
              status: "success",
              title: "Check 1",
              description: "Description 1",
            },
            {
              status: "success",
              title: "Check 2",
              description: "Description 2",
            },
            {
              status: "success",
              title: "Check 3",
              description: "Description 3",
            },
          ],
        },
      } as any;

      render(
        <Report
          repoUrl={mockReport.repoUrl}
          statusChecks={mockReport.statusChecks}
        />
      );

      expect(
        screen.getByText("Contributor Readiness Report")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Status checks for https://github.com/example/repo")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Overall Score: 100% (3 of 3 checks passed)")
      ).toBeInTheDocument();
      expect(screen.getByText("3 Passed")).toBeInTheDocument();
      expect(screen.getByText("0 Warnings")).toBeInTheDocument();
      expect(screen.getByText("0 Failed")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero checks gracefully", () => {
      const mockReport: MockReportType = {
        repoUrl: "https://github.com/example/repo",
        statusChecks: {
          score: 0,
          summary: {
            success: 0,
            warning: 0,
            error: 0,
          },
          allChecks: [],
        },
      } as any;

      render(
        <Report
          repoUrl={mockReport.repoUrl}
          statusChecks={mockReport.statusChecks}
        />
      );

      expect(
        screen.getByText("Overall Score: 0% (0 of 0 checks passed)")
      ).toBeInTheDocument();
      expect(screen.getByText("0 Passed")).toBeInTheDocument();
      expect(screen.getByText("0 Warnings")).toBeInTheDocument();
      expect(screen.getByText("0 Failed")).toBeInTheDocument();
    });

    it("should render correctly with mixed check statuses", () => {
      const mockReport: MockReportType = {
        repoUrl: "https://github.com/example/repo",
        statusChecks: {
          score: 50,
          summary: {
            success: 1,
            warning: 1,
            error: 1,
          },
          allChecks: [
            {
              status: "success",
              title: "Check 1",
              description: "Description 1",
            },
            {
              status: "warning",
              title: "Check 2",
              description: "Description 2",
            },
            { status: "error", title: "Check 3", description: "Description 3" },
          ],
        },
      } as any;

      render(
        <Report
          repoUrl={mockReport.repoUrl}
          statusChecks={mockReport.statusChecks}
        />
      );

      expect(
        screen.getByText("Overall Score: 50% (1 of 3 checks passed)")
      ).toBeInTheDocument();
      expect(screen.getByText("1 Passed")).toBeInTheDocument();
      expect(screen.getByText("1 Warnings")).toBeInTheDocument();
      expect(screen.getByText("1 Failed")).toBeInTheDocument();
    });
  });
});

// End of unit tests for: Report
