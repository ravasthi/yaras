import {
  addGlobalSetting,
  addSettingForPage,
} from 'actions/settings';

import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';

import {
  mapDispatchToProps,
  mapStateToProps,
} from 'pages/typeface-tester/ConnectedTypefaceTester';

describe('ConnectedTypefaceTester', () => {
  let sandbox;
  let dispatchStub;

  before(() => {
    initTests();
    sandbox = sinon.createSandbox();
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
          typefaceTester: {
            snippet: 'tale-of-two-cities',
          },
        },
      });

      expect(props.family).to.equal('Averta Std');
      expect(props.snippet).to.equal('tale-of-two-cities');
    });

    it('should handle when there are no settings for the page', () => {
      const props = mapStateToProps({
        settings: {
          family: 'Averta Std',
        },
      });

      expect(props.family).to.equal('Averta Std');
      expect(props.snippet).to.be.undefined();
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
      expect(props.onUpdateText).to.exist();
      expect(props.onUpdateText).to.be.a('function');
    });

    it('should call dispatch when onUpdateFamily is invoked', () => {
      props.onUpdateFamily('Brix Slab');

      expect(dispatchStub.callCount).to.equal(1);
      expect(dispatchStub.calledWith(addGlobalSetting('family', 'Brix Slab'))).to.be.true();
    });

    it('should call dispatch when onUpdateText is invoked', () => {
      props.onUpdateText('scandal-in-bohemia');

      expect(dispatchStub.callCount).to.equal(1);
      expect(dispatchStub.calledWith(
        addSettingForPage('typefaceTester', 'snippet', 'scandal-in-bohemia')
      )).to.be.true();
    });
  });
});

