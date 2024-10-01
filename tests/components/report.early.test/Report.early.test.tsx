
// Unit tests for: Report

import React from 'react'
import { CheckStatus } from "@/types/checks";
import { render, screen } from '@testing-library/react';
import Report from '../../../src/components/Report';
import "@testing-library/jest-dom";

// Mock components
jest.mock("lucide-react", () => ({
  CheckCircle2: jest.fn(() => <div>CheckCircle2 Icon</div>),
  XCircle: jest.fn(() => <div>XCircle Icon</div>),
  AlertCircle: jest.fn(() => <div>AlertCircle Icon</div>),
}));

// Mock interface
interface MockStatusCheck {
  title: string;
  description: string;
  status: CheckStatus;
}

// Test suite
describe('Report() Report method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    it('should render the report with success status icon', () => {
      const mockStatusChecks: MockStatusCheck[] = [
        {
          title: 'Check 1',
          description: 'Description 1',
          status: 'success',
        },
      ] as any;

      render(<Report repoUrl="https://github.com/example/repo" statusChecks={mockStatusChecks as any} />);

      expect(screen.getByText('Contributor Readiness Report')).toBeInTheDocument();
      expect(screen.getByText('Status checks for https://github.com/example/repo')).toBeInTheDocument();
      expect(screen.getByText('Check 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('CheckCircle2 Icon')).toBeInTheDocument();
    });

    it('should render the report with error status icon', () => {
      const mockStatusChecks: MockStatusCheck[] = [
        {
          title: 'Check 2',
          description: 'Description 2',
          status: 'error',
        },
      ] as any;

      render(<Report repoUrl="https://github.com/example/repo" statusChecks={mockStatusChecks as any} />);

      expect(screen.getByText('Check 2')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
      expect(screen.getByText('XCircle Icon')).toBeInTheDocument();
    });

    it('should render the report with warning status icon', () => {
      const mockStatusChecks: MockStatusCheck[] = [
        {
          title: 'Check 3',
          description: 'Description 3',
          status: 'warning',
        },
      ] as any;

      render(<Report repoUrl="https://github.com/example/repo" statusChecks={mockStatusChecks as any} />);

      expect(screen.getByText('Check 3')).toBeInTheDocument();
      expect(screen.getByText('Description 3')).toBeInTheDocument();
      expect(screen.getByText('AlertCircle Icon')).toBeInTheDocument();
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should handle an empty statusChecks array', () => {
      const mockStatusChecks: MockStatusCheck[] = [] as any;

      render(<Report repoUrl="https://github.com/example/repo" statusChecks={mockStatusChecks as any} />);

      expect(screen.getByText('Contributor Readiness Report')).toBeInTheDocument();
      expect(screen.getByText('Status checks for https://github.com/example/repo')).toBeInTheDocument();
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });

    it('should handle a null repoUrl', () => {
      const mockStatusChecks: MockStatusCheck[] = [
        {
          title: 'Check 4',
          description: 'Description 4',
          status: 'success',
        },
      ] as any;

      render(<Report repoUrl={null as any} statusChecks={mockStatusChecks as any} />);

      expect(screen.getByText('Contributor Readiness Report')).toBeInTheDocument();
      expect(screen.getByText('Status checks for null')).toBeInTheDocument();
      expect(screen.getByText('Check 4')).toBeInTheDocument();
      expect(screen.getByText('Description 4')).toBeInTheDocument();
    });
  });
});

// End of unit tests for: Report
