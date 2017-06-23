/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';
/* eslint-enable import/no-extraneous-dependencies */

function initTests() {
  global.expect = chai.expect;

  chai.use(chaiEnzyme());
  chai.use(dirtyChai);
}

function cleanUpTests() {
  delete global.expect;
}

export {
  initTests,
  cleanUpTests,
};
