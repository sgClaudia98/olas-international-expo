import {
  validatePhoneNumberWithErrors,
  parsePhoneNumber,
  parseStringToPhoneNumber,
  phoneNumberValidation,
  phoneNumberValidationNotRequired,
} from '../PhoneNumberHelper';
import * as Yup from 'yup';

// Mock google-libphonenumber
jest.mock('google-libphonenumber', () => {
  const mockParsedNumber = {
    getCountryCode: () => 1,
    getNationalNumber: () => 2345678901,
  };

  const mockPhoneUtil = {
    getInstance: jest.fn(() => mockPhoneUtil),
    parseAndKeepRawInput: jest.fn(() => mockParsedNumber),
    parse: jest.fn(() => mockParsedNumber),
    isValidNumber: jest.fn(() => true),
    format: jest.fn((number, format) => {
      if (format === 4) return '+12345678901'; // E164
      if (format === 1) return '(234) 567-8901'; // National
      return '+12345678901';
    }),
    getRegionCodeForNumber: jest.fn(() => 'US'),
    getExampleNumberForType: jest.fn(() => mockParsedNumber),
  };

  return {
    PhoneNumberUtil: {
      getInstance: () => mockPhoneUtil,
    },
    PhoneNumberType: {
      MOBILE: 1,
    },
  };
});

describe('PhoneNumberHelper', () => {
  describe('validatePhoneNumberWithErrors', () => {
    it('validates correct US phone number', () => {
      const result = validatePhoneNumberWithErrors('+1234567890', 'US');
      expect(result.isValid).toBe(true);
    });

    it('returns error for invalid phone number', () => {
      const { PhoneNumberUtil } = require('google-libphonenumber');
      const mockPhoneUtil = PhoneNumberUtil.getInstance();
      mockPhoneUtil.isValidNumber.mockReturnValueOnce(false);

      const result = validatePhoneNumberWithErrors('123', 'US');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid phone number format');
    });

    it('handles parsing errors gracefully', () => {
      const { PhoneNumberUtil } = require('google-libphonenumber');
      const mockPhoneUtil = PhoneNumberUtil.getInstance();
      mockPhoneUtil.parseAndKeepRawInput.mockImplementationOnce(() => {
        throw new Error('Parse error');
      });

      const result = validatePhoneNumberWithErrors('invalid', 'US');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('parsePhoneNumber', () => {
    it('formats phone number to E164 format by default', () => {
      const result = parsePhoneNumber('1234567890', 'US');
      expect(result).toBe('+12345678901');
    });

    it('formats phone number with custom format type', () => {
      const { PhoneNumberUtil } = require('google-libphonenumber');
      const mockPhoneUtil = PhoneNumberUtil.getInstance();
      mockPhoneUtil.format.mockReturnValueOnce('(234) 567-8901');

      const result = parsePhoneNumber('1234567890', 'US', 1);
      expect(result).toBe('(234) 567-8901');
    });

    it('returns empty string for invalid phone numbers', () => {
      const { PhoneNumberUtil } = require('google-libphonenumber');
      const mockPhoneUtil = PhoneNumberUtil.getInstance();
      mockPhoneUtil.parse.mockImplementationOnce(() => {
        throw new Error('Parse error');
      });

      const result = parsePhoneNumber('invalid', 'US');
      expect(result).toBe('');
    });

    it('handles different country codes', () => {
      const result = parsePhoneNumber('20 7946 0958', 'GB');
      expect(result).toBe('+12345678901');
    });
  });

  describe('parseStringToPhoneNumber', () => {
    it('parses complete phone number and returns code and number', () => {
      const result = parseStringToPhoneNumber('+1234567890');
      expect(result).toEqual({
        code: 'US',
        number: '+12345678901',
      });
    });

    it('handles custom format types', () => {
      const { PhoneNumberUtil } = require('google-libphonenumber');
      const mockPhoneUtil = PhoneNumberUtil.getInstance();
      mockPhoneUtil.format.mockReturnValueOnce('(234) 567-8901');

      const result = parseStringToPhoneNumber('+1234567890', 1);
      expect(result).toEqual({
        code: 'US',
        number: '(234) 567-8901',
      });
    });

    it('returns undefined values for invalid phone numbers', () => {
      const { PhoneNumberUtil } = require('google-libphonenumber');
      const mockPhoneUtil = PhoneNumberUtil.getInstance();
      mockPhoneUtil.parse.mockImplementationOnce(() => {
        throw new Error('Parse error');
      });

      const result = parseStringToPhoneNumber('invalid');
      expect(result).toEqual({
        code: undefined,
        number: undefined,
      });
    });

    it('handles international phone numbers', () => {
      const { PhoneNumberUtil } = require('google-libphonenumber');
      const mockPhoneUtil = PhoneNumberUtil.getInstance();
      mockPhoneUtil.getRegionCodeForNumber.mockReturnValueOnce('GB');

      const result = parseStringToPhoneNumber('+442079460958');
      expect(result.code).toBe('GB');
    });
  });

  describe('phoneNumberValidation (Required)', () => {
    it('validates required phone number successfully', async () => {
      const schema = phoneNumberValidation;
      const validData = { number: '+1234567890', code: 'US' };

      await expect(schema.validate(validData)).resolves.toEqual(validData);
    });

    it('fails validation for missing phone number', async () => {
      const schema = phoneNumberValidation;
      const invalidData = { number: '', code: 'US' };

      await expect(schema.validate(invalidData)).rejects.toThrow('Phone number is required');
    });

    it('fails validation for invalid phone number', async () => {
      const { PhoneNumberUtil } = require('google-libphonenumber');
      const mockPhoneUtil = PhoneNumberUtil.getInstance();
      mockPhoneUtil.isValidNumber.mockReturnValueOnce(false);

      const schema = phoneNumberValidation;
      const invalidData = { number: '123', code: 'US' };

      await expect(schema.validate(invalidData)).rejects.toThrow();
    });

    it('uses default country code when not provided', async () => {
      const schema = phoneNumberValidation;
      const validData = { number: '+1234567890' };

      // Should not throw, using default US country code
      await expect(schema.validate(validData)).resolves.toBeDefined();
    });
  });

  describe('phoneNumberValidationNotRequired (Optional)', () => {
    it('allows empty phone number', async () => {
      const schema = phoneNumberValidationNotRequired;
      const validData = { number: '', code: 'US' };

      await expect(schema.validate(validData)).resolves.toEqual(validData);
    });

    it('allows whitespace-only phone number', async () => {
      const schema = phoneNumberValidationNotRequired;
      const validData = { number: '   ', code: 'US' };

      await expect(schema.validate(validData)).resolves.toEqual(validData);
    });

    it('validates valid phone number when provided', async () => {
      const schema = phoneNumberValidationNotRequired;
      const validData = { number: '+1234567890', code: 'US' };

      await expect(schema.validate(validData)).resolves.toEqual(validData);
    });

    it('fails validation for invalid phone number when provided', async () => {
      const { PhoneNumberUtil } = require('google-libphonenumber');
      const mockPhoneUtil = PhoneNumberUtil.getInstance();
      mockPhoneUtil.isValidNumber.mockReturnValueOnce(false);

      const schema = phoneNumberValidationNotRequired;
      const invalidData = { number: '123', code: 'US' };

      await expect(schema.validate(invalidData)).rejects.toThrow();
    });

    it('uses default country code when not provided', async () => {
      const schema = phoneNumberValidationNotRequired;
      const validData = { number: '+1234567890' };

      await expect(schema.validate(validData)).resolves.toBeDefined();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles null and undefined inputs gracefully', () => {
      expect(parsePhoneNumber('', 'US')).toBe('');
      expect(parseStringToPhoneNumber('')).toEqual({ code: undefined, number: undefined });
    });

    it('handles very long phone numbers', () => {
      const longNumber = '1'.repeat(50);
      const result = parsePhoneNumber(longNumber, 'US');
      // Should either format correctly or return empty string
      expect(typeof result).toBe('string');
    });

    it('handles special characters in phone numbers', () => {
      const specialNumber = '+1 (234) 567-8901 ext. 123';
      const result = parsePhoneNumber(specialNumber, 'US');
      expect(typeof result).toBe('string');
    });

    it('handles different country codes correctly', () => {
      const testCases = [
        { number: '20 7946 0958', country: 'GB' },
        { number: '1 42 68 53 00', country: 'FR' },
        { number: '30 12345678', country: 'DE' },
        { number: '3 1234 5678', country: 'AU' },
      ];

      testCases.forEach(({ number, country }) => {
        const result = parsePhoneNumber(number, country);
        expect(typeof result).toBe('string');
      });
    });
  });

  describe('Format Types', () => {
    it('formats with different format types correctly', () => {
      const { PhoneNumberUtil } = require('google-libphonenumber');
      const mockPhoneUtil = PhoneNumberUtil.getInstance();

      // Test different format types
      const formatResults = [
        '+12345678901', // E164
        '(234) 567-8901', // National
        '+1 234-567-8901', // International
        '234-567-8901', // National formatted
      ];

      formatResults.forEach((expectedResult, formatType) => {
        mockPhoneUtil.format.mockReturnValueOnce(expectedResult);
        const result = parsePhoneNumber('1234567890', 'US', formatType);
        expect(result).toBe(expectedResult);
      });
    });
  });

  describe('Real World Phone Number Examples', () => {
    const realWorldExamples = [
      { input: '+1-555-123-4567', country: 'US', description: 'US with dashes' },
      { input: '(555) 123-4567', country: 'US', description: 'US with parentheses' },
      { input: '+44 20 7946 0958', country: 'GB', description: 'UK London number' },
      { input: '+33 1 42 68 53 00', country: 'FR', description: 'France Paris number' },
      { input: '+49 30 12345678', country: 'DE', description: 'Germany Berlin number' },
      { input: '+81 3-1234-5678', country: 'JP', description: 'Japan Tokyo number' },
    ];

    realWorldExamples.forEach(({ input, country, description }) => {
      it(`handles ${description}: ${input}`, () => {
        const result = parsePhoneNumber(input, country);
        expect(typeof result).toBe('string');
        // Should either successfully format or return empty string for invalid
        expect(result).toBeDefined();
      });
    });
  });
});