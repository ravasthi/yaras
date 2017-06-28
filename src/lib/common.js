import _ from 'lodash';

function getPageTitle(pageTitle = '') {
  const appTitle = 'Yet another React app starter';

  if (isUndefinedOrEmpty(pageTitle)) {
    return appTitle;
  }

  return `${pageTitle.trim()} | ${appTitle}`;
}

function isUndefinedOrEmpty(value) {
  return (
    _.isNull(value) ||
    _.isUndefined(value) ||
    (!_.isNumber(value) && _.isEmpty(value))
  );
}

export {
  getPageTitle,
  isUndefinedOrEmpty,
};
