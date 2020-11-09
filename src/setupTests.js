import 'jest-extended';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'leaked-handles';
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom';
