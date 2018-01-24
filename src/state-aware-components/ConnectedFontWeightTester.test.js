import { addGlobalSetting } from 'actions/settings';
import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';

import {
  mapDispatchToProps,
  mapStateToProps,
} from 'state-aware-components/ConnectedFontWeightTester';

describe('ConnectedFontWeightTester', () => {
  let sandbox;
  let dispatchStub;

  before(() => {
    initTests();
    sandbox = sinon.sandbox.create();
    dispatchStub = sandbox.stub();
  });

  afterEach(() => {
    dispatchStub.reset();
  });

  after(() => {
    sandbox.restore();
    cleanUpTests();
  });

  describe('mapStateToProps', () => {
    it('should correctly extract the family setting from state', () => {
      const props = mapStateToProps({
        settings: {
          family: 'Averta Std',
        },
      });

      expect(props.family).to.equal('Averta Std');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(dispatchStub);
    });

    it('should return an object of the right form', () => {
      expect(props.onUpdateFamily).to.exist();
      expect(props.onUpdateFamily).to.be.a('function');
    });

    it('should call dispatch when onUpdateFamily is invoked', () => {
      props.onUpdateFamily('Brix Slab');

      expect(dispatchStub.callCount).to.equal(1);
      expect(dispatchStub.calledWith(addGlobalSetting('family', 'Brix Slab'))).to.be.true();
    });
  });
});

