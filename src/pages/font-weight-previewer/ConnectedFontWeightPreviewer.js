import { addGlobalSetting } from 'app/actions/settings.js';
import { connect } from 'react-redux';

import FontWeightPreviewer from 'app/pages/font-weight-previewer/FontWeightPreviewer.js';

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

export { mapStateToProps, mapDispatchToProps };
