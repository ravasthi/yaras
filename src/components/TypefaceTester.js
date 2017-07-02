import { getPageTitle } from '../lib/common';

import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import snippets from 'lib/book-snippets';

class TypefaceTester extends Component {
  static propTypes = {
    family: PropTypes.string,
    snippet: PropTypes.oneOf(Object.keys(snippets)),
    onUpdateFamily: PropTypes.func,
    onUpdateText: PropTypes.func,
  };

  static defaultProps = {
    family: 'Avenir Next',
    snippet: 'pride-and-prejudice',
    onUpdateFamily: /* istanbul ignore next */ () => {},
    onUpdateText: /* istanbul ignore next */ () => {},
  };

  constructor(props) {
    super(props);

    /*
    ** Ugh: https://github.com/gotwarlost/istanbul/issues/690
    ** Workaround: https://github.com/gotwarlost/istanbul/issues/690#issuecomment-265718617
    */
    /* istanbul ignore next */
    this.updateText = this.updateText.bind(this);
    this.updateFamily = this.updateFamily.bind(this);

    this.state = {
      family: props.family,
      snippet: props.snippet,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      family: nextProps.family,
      snippet: nextProps.snippet,
    });
  }

  updateFamily(event) {
    event.preventDefault();

    let family = this.textInput.value || '';
    family = family.trim();

    if (family !== '') {
      this.setState({ family });
      this.props.onUpdateFamily(family);
    }

    this.textInput.value = family;
  }

  updateText(event) {
    this.setState({
      snippet: event.target.value,
    });
    this.props.onUpdateText(event.target.value);
  }

  render() {
    const textContent = snippets[this.state.snippet].component();
    const textStyle = {
      fontFamily: this.state.family,
    };

    return (
      <div id="typeface-tester">
        <div className="page-content-header">
          <DocumentTitle title={getPageTitle('Typeface tester')}>
            <h1>Typeface tester</h1>
          </DocumentTitle>
        </div>

        <div className="module">
          <form className="settings">
            <div className="field">
              <label htmlFor="books">
                Choose a book
              </label>
              <select
                name="books"
                className="books"
                value={this.state.snippet}
                onChange={this.updateText}
              >
                {Object.keys(snippets).map(snippetName => (
                  <option
                    value={snippetName}
                    key={snippetName}
                  >
                    {snippets[snippetName].title}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="family">
                Choose a typeface
              </label>
              <input
                type="text"
                name="family"
                className="family"
                placeholder="Font family name, e.g. Helvetica"
                autoCapitalize="words"
                ref={(input) => { this.textInput = input; }}
              />
            </div>
            <button className="update-family" onClick={this.updateFamily}>Change typeface</button>
          </form>
        </div>

        <div className="module">
          <div className="snippet-content" style={textStyle}>
            {textContent}
          </div>
        </div>
      </div>
    );
  }
}

export default TypefaceTester;
