/**
 * Validation Utilities Tests for SCI-SA Gala
 * Basic unit tests for validation functions
 */

import { 
  validateTicketNumber, 
  validateStudentNumber, 
  validateSellTicketForm,
  getTicketNumberError,
  getStudentNumberError
} from '../validation.js';

describe('Validation Utilities', () => {
  describe('validateTicketNumber', () => {
    test('should validate correct ticket numbers', () => {
      expect(validateTicketNumber('M123')).toBe(true);
      expect(validateTicketNumber('M001')).toBe(true);
      expect(validateTicketNumber('M999')).toBe(true);
    });

    test('should reject invalid ticket numbers', () => {
      expect(validateTicketNumber('m123')).toBe(false); // lowercase
      expect(validateTicketNumber('M12')).toBe(false); // too short
      expect(validateTicketNumber('M1234')).toBe(false); // too long
      expect(validateTicketNumber('123')).toBe(false); // missing M
      expect(validateTicketNumber('MABC')).toBe(false); // non-numeric
      expect(validateTicketNumber('')).toBe(false); // empty
    });
  });

  describe('validateStudentNumber', () => {
    test('should validate correct student numbers', () => {
      expect(validateStudentNumber('123456789')).toBe(true);
      expect(validateStudentNumber('000000000')).toBe(true);
      expect(validateStudentNumber('999999999')).toBe(true);
    });

    test('should reject invalid student numbers', () => {
      expect(validateStudentNumber('12345678')).toBe(false); // too short
      expect(validateStudentNumber('1234567890')).toBe(false); // too long
      expect(validateStudentNumber('12345678a')).toBe(false); // non-numeric
      expect(validateStudentNumber('')).toBe(false); // empty
    });
  });

  describe('validateSellTicketForm', () => {
    test('should validate correct form data', () => {
      const formData = {
        ticketNumber: 'M123',
        studentNumber: '123456789'
      };
      
      const result = validateSellTicketForm(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    test('should validate form with errors', () => {
      const formData = {
        ticketNumber: 'invalid',
        studentNumber: '123'
      };
      
      const result = validateSellTicketForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('ticketNumber');
      expect(result.errors).toHaveProperty('studentNumber');
    });
  });

  describe('getTicketNumberError', () => {
    test('should return null for valid ticket numbers', () => {
      expect(getTicketNumberError('M123')).toBeNull();
    });

    test('should return error for invalid ticket numbers', () => {
      expect(getTicketNumberError('invalid')).toContain('M followed by 3 digits');
      expect(getTicketNumberError('')).toContain('required');
    });
  });

  describe('getStudentNumberError', () => {
    test('should return null for valid student numbers', () => {
      expect(getStudentNumberError('123456789')).toBeNull();
    });

    test('should return error for invalid student numbers', () => {
      expect(getStudentNumberError('123')).toContain('exactly 9 digits');
      expect(getStudentNumberError('')).toContain('required');
    });
  });
});
