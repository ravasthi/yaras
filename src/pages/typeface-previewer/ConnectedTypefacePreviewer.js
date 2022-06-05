import { addGlobalSetting, addSettingForPage } from 'app/actions/settings.js';
import { connect } from 'react-redux';

import TypefacePreviewer from 'app/pages/typeface-previewer/TypefacePreviewer.js';

function mapStateToProps(state) {
  const { settings } = state;

  return {
    family: settings.family,
    snippetName:
      settings.typefacePreviewer && settings.typefacePreviewer.snippetName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateFamily: (family) => {
      dispatch(addGlobalSetting('family', family));
    },

    onUpdateText: (snippetName) => {
      dispatch(
        addSettingForPage('typefacePreviewer', 'snippetName', snippetName)
      );
    },
  };
}

const ConnectedTypefacePreviewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypefacePreviewer);

export default ConnectedTypefacePreviewer;

export { mapStateToProps, mapDispatchToProps };
