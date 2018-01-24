import { addGlobalSetting, addSettingForPage } from 'actions/settings';
import { connect } from 'react-redux';

import TypefaceTester from 'components/TypefaceTester';

function mapStateToProps(state) {
  const { settings } = state;

  return {
    family: settings.family,
    snippet: settings.typefaceTester && settings.typefaceTester.snippet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateFamily: (family) => {
      dispatch(addGlobalSetting('family', family));
    },

    onUpdateText: (snippet) => {
      dispatch(addSettingForPage('typefaceTester', 'snippet', snippet));
    },
  };
}

const ConnectedTypefaceTester = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypefaceTester);

export default ConnectedTypefaceTester;

export {
  mapStateToProps,
  mapDispatchToProps,
};
