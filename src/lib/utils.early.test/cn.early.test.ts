// Unit tests for: cn

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cn } from "../utils";

// Mocking the ClassValue type
type MockClassValue = {
  className: string;
  condition?: boolean;
};

// Mocking the clsx and twMerge functions
jest.mock("clsx", () => ({
  clsx: jest.fn(),
}));

jest.mock("tailwind-merge", () => ({
  twMerge: jest.fn(),
}));

// Import the cn function
describe("cn() cn method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy path tests
  describe("Happy Path", () => {
    it("should merge class names correctly", () => {
      // Arrange
      const mockInput1: MockClassValue = { className: "class1" } as any;
      const mockInput2: MockClassValue = { className: "class2" } as any;
      (clsx as jest.Mock).mockReturnValue("class1 class2" as any);
      (twMerge as jest.Mock).mockReturnValue("class1 class2" as any);

      // Act
      const result = cn(mockInput1, mockInput2);

      // Assert
      expect(clsx).toHaveBeenCalledWith([mockInput1, mockInput2] as any);
      expect(twMerge).toHaveBeenCalledWith("class1 class2" as any);
      expect(result).toBe("class1 class2");
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

    it("should handle conditional class names", () => {
      // Arrange
      const mockInput1: MockClassValue = {
        className: "class1",
        condition: true,
      } as any;
      const mockInput2: MockClassValue = {
        className: "class2",
        condition: false,
      } as any;
      (clsx as jest.Mock).mockReturnValue("class1" as any);
      (twMerge as jest.Mock).mockReturnValue("class1" as any);

      // Act
      const result = cn(mockInput1, mockInput2);

      // Assert
      expect(clsx).toHaveBeenCalledWith([mockInput1, mockInput2] as any);
      expect(twMerge).toHaveBeenCalledWith("class1" as any);
      expect(result).toBe("class1");
    });

    it("should handle null and undefined values", () => {
      // Arrange
      const mockInput1: MockClassValue = { className: "class1" } as any;
      (clsx as jest.Mock).mockReturnValue("class1" as any);
      (twMerge as jest.Mock).mockReturnValue("class1" as any);

      // Act
      const result = cn(mockInput1, null as any, undefined as any);

      // Assert
      expect(clsx).toHaveBeenCalledWith([mockInput1, null, undefined] as any);
      expect(twMerge).toHaveBeenCalledWith("class1" as any);
      expect(result).toBe("class1");
    });
  });
});

// End of unit tests for: cn
