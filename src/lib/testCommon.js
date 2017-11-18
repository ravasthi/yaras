/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
/* eslint-enable import/no-extraneous-dependencies */

let adapterConfigured = false;

function initTests() {
  global.expect = chai.expect;
  global.sinon = sinon;

  if (!adapterConfigured) {
    configure({ adapter: new Adapter() });
    adapterConfigured = true;
  }

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
