import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';

import {
  getPageTitle,
  isUndefinedOrEmpty
} from 'lib/common';

describe('common utilities', () => {
  before(() => {
    initTests();
  });

  after(() => {
    cleanUpTests();
  });

  describe('getPageTitle', () => {
    it('should append the app name to the desired page title', () => {
      expect(getPageTitle('Home')).to.equal('Home | Yet another React app starter');
    });

    it('should return just the app name if no page title is provided', () => {
      expect(getPageTitle()).to.equal('Yet another React app starter');
      expect(getPageTitle('')).to.equal('Yet another React app starter');
    });
  });

  describe('isUndefinedOrEmpty', () => {
    it('should return false for a defined value of any kind', () => {
      expect(isUndefinedOrEmpty(1)).to.be.false();
      expect(isUndefinedOrEmpty('hello')).to.be.false();
      expect(isUndefinedOrEmpty({ hello: 'Gutentag' })).to.be.false();
    });

    it('should return false if the value is 0', () => {
      expect(isUndefinedOrEmpty(0)).to.be.false();
    });

    it('should return true for an undefined value', () => {
      expect(isUndefinedOrEmpty(undefined)).to.be.true();
    });

    it('should return true for a null value', () => {
      expect(isUndefinedOrEmpty(null)).to.be.true();
    });

    it('should return true for an empty string', () => {
      expect(isUndefinedOrEmpty('')).to.be.true();
    });

    it('should return true for an empty object', () => {
      expect(isUndefinedOrEmpty({})).to.be.true();
    });
  });
});
