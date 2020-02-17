import { addGlobalSetting } from 'actions/settings';
import { connect } from 'react-redux';

import FontWeightPreviewer from 'pages/font-weight-previewer/FontWeightPreviewer';

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

const ConnectedFontWeightPreviewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FontWeightPreviewer);

export default ConnectedFontWeightPreviewer;

export {
  mapStateToProps,
  mapDispatchToProps,
};
