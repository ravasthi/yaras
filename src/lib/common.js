import _ from 'lodash';

function isUndefinedOrEmpty(value) {
  return (
    _.isNull(value) ||
    _.isUndefined(value) ||
    (!_.isNumber(value) && _.isEmpty(value))
  );
}

function getPageTitle(pageTitle = '') {
  const appTitle = 'Yet another React app starter';

  if (isUndefinedOrEmpty(pageTitle)) {
    return appTitle;
  }

  return `${pageTitle.trim()} | ${appTitle}`;
}

export {
  getPageTitle,
  isUndefinedOrEmpty,
};
