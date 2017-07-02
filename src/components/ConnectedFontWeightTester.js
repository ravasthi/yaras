import { addGlobalSetting } from 'actions/settings';
import { connect } from 'react-redux';

import FontWeightTester from 'components/FontWeightTester';

function mapStateToProps(state) {
  return {
    family: state.settings.family,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateFamily: (family) => {
      dispatch(addGlobalSetting('family', family));
    },
  };
}

const ConnectedFontWeightTester = connect(
  mapStateToProps,
  mapDispatchToProps
)(FontWeightTester);

export default ConnectedFontWeightTester;

export {
  mapStateToProps,
  mapDispatchToProps,
};
