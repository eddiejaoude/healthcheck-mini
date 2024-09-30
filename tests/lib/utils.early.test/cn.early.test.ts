// Unit tests for: cn

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cn } from "../../../src/lib/utils";

// Mocking the ClassValue type
type MockClassValue = {
  className: string;
  isActive: boolean;
};

// Mocking the clsx and twMerge functions
jest.mock("clsx", () => ({
  clsx: jest.fn(),
}));

jest.mock("tailwind-merge", () => ({
  twMerge: jest.fn(),
}));

// Importing the cn function
describe("cn() cn method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy path tests
  describe("Happy Path", () => {
    it("should return a merged class string when valid class values are provided", () => {
      // Arrange
      const mockInput1: MockClassValue = {
        className: "text-center",
        isActive: true,
      } as any;
      const mockInput2: MockClassValue = {
        className: "bg-blue-500",
        isActive: true,
      } as any;
      (clsx as jest.Mock).mockReturnValue("text-center bg-blue-500" as any);
      (twMerge as jest.Mock).mockReturnValue("text-center bg-blue-500" as any);

      // Act
      const result = cn(mockInput1, mockInput2);

      // Assert
      expect(clsx).toHaveBeenCalledWith([mockInput1, mockInput2] as any);
      expect(twMerge).toHaveBeenCalledWith("text-center bg-blue-500" as any);
      expect(result).toBe("text-center bg-blue-500");
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should handle empty input gracefully", () => {
      // Arrange
      (clsx as jest.Mock).mockReturnValue("" as any);
      (twMerge as jest.Mock).mockReturnValue("" as any);

      // Act
      const result = cn();

      // Assert
      expect(clsx).toHaveBeenCalledWith([] as any);
      expect(twMerge).toHaveBeenCalledWith("" as any);
      expect(result).toBe("");
    });

    it("should handle null and undefined values", () => {
      // Arrange
      const mockInput1: MockClassValue = {
        className: null,
        isActive: true,
      } as any;
      const mockInput2: MockClassValue = {
        className: undefined,
        isActive: true,
      } as any;
      (clsx as jest.Mock).mockReturnValue("" as any);
      (twMerge as jest.Mock).mockReturnValue("" as any);

      // Act
      const result = cn(mockInput1, mockInput2);

      // Assert
      expect(clsx).toHaveBeenCalledWith([mockInput1, mockInput2] as any);
      expect(twMerge).toHaveBeenCalledWith("" as any);
      expect(result).toBe("");
    });

    it("should handle mixed valid and invalid class values", () => {
      // Arrange
      const mockInput1: MockClassValue = {
        className: "text-center",
        isActive: true,
      } as any;
      const mockInput2: MockClassValue = {
        className: null,
        isActive: false,
      } as any;
      (clsx as jest.Mock).mockReturnValue("text-center" as any);
      (twMerge as jest.Mock).mockReturnValue("text-center" as any);

      // Act
      const result = cn(mockInput1, mockInput2);

      // Assert
      expect(clsx).toHaveBeenCalledWith([mockInput1, mockInput2] as any);
      expect(twMerge).toHaveBeenCalledWith("text-center" as any);
      expect(result).toBe("text-center");
    });
  });
});

// End of unit tests for: cn
