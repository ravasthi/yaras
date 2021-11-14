import { getPageTitle, isUndefinedOrEmpty } from 'app/lib/common';

describe('common utilities', () => {
  describe('getPageTitle', () => {
    it('should append the app name to the desired page title', () => {
      expect(getPageTitle('Home')).toBe('Home | Yet another React app starter');
    });

    it('should return just the app name if no page title is provided', () => {
      expect(getPageTitle()).toBe('Yet another React app starter');
      expect(getPageTitle('')).toBe('Yet another React app starter');
    });
  });

  describe('isUndefinedOrEmpty', () => {
    it('should return false for a defined value of any kind', () => {
      expect(isUndefinedOrEmpty(1)).toBe(false);
      expect(isUndefinedOrEmpty('hello')).toBe(false);
      expect(isUndefinedOrEmpty({ hello: 'Gutentag' })).toBe(false);
    });

    it('should return false if the value is 0', () => {
      expect(isUndefinedOrEmpty(0)).toBe(false);
    });

    it('should return true for an undefined value', () => {
      expect(isUndefinedOrEmpty(undefined)).toBe(true);
    });

    it('should return true for a null value', () => {
      expect(isUndefinedOrEmpty(null)).toBe(true);
    });

    it('should return true for an empty string', () => {
      expect(isUndefinedOrEmpty('')).toBe(true);
    });

    it('should return true for an empty object', () => {
      expect(isUndefinedOrEmpty({})).toBe(true);
    });
  });
});
