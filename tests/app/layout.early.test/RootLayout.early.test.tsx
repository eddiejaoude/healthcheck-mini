
// Unit tests for: RootLayout

import React from 'react'
import { render } from '@testing-library/react';
import RootLayout from '../../../src/app/layout';
import "@testing-library/jest-dom";

describe('RootLayout() RootLayout method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should render children correctly', () => {
      // This test checks if the RootLayout renders its children properly.
      const { getByText } = render(
        <RootLayout>
          <div>Test Child</div>
        </RootLayout>
      );
      expect(getByText('Test Child')).toBeInTheDocument();
    });

    it('should apply the correct classes to the body element', () => {
      // This test verifies that the body element has the correct classes applied.
      const { container } = render(
        <RootLayout>
          <div>Test Child</div>
        </RootLayout>
      );
      const body = container.querySelector('body');
      expect(body).toHaveClass('antialiased');
      expect(body).toHaveClass('--font-geist-sans');
      expect(body).toHaveClass('--font-geist-mono');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle no children gracefully', () => {
      // This test ensures that the RootLayout can handle being rendered without children.
      const { container } = render(<RootLayout>{null}</RootLayout>);
      const body = container.querySelector('body');
      expect(body).toBeInTheDocument();
      expect(body).toBeEmptyDOMElement();
    });

    it('should handle undefined children gracefully', () => {
      // This test ensures that the RootLayout can handle undefined children.
      const { container } = render(<RootLayout>{undefined}</RootLayout>);
      const body = container.querySelector('body');
      expect(body).toBeInTheDocument();
      expect(body).toBeEmptyDOMElement();
    });

    it('should handle multiple children elements', () => {
      // This test checks if the RootLayout can render multiple children elements.
      const { getByText } = render(
        <RootLayout>
          <div>Child 1</div>
          <div>Child 2</div>
        </RootLayout>
      );
      expect(getByText('Child 1')).toBeInTheDocument();
      expect(getByText('Child 2')).toBeInTheDocument();
    });
  });
});

// End of unit tests for: RootLayout
