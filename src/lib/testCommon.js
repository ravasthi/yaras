/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
/* eslint-enable import/no-extraneous-dependencies */

function initTests() {
  global.expect = chai.expect;
  global.sinon = sinon;

  chai.use(chaiEnzyme());
  chai.use(dirtyChai);
}

function cleanUpTests() {
  delete global.expect;
  delete global.sinon;
}

export {
  initTests,
  cleanUpTests,
};
