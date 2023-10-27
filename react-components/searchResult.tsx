import React from 'react';
import { Component } from 'react';

type SearchResultState = {
  results: { name: string; description: string }[];
};

export default class SearchResult extends Component<{}, SearchResultState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      results: [],
    };
  }

  render() {
    return (
      <div className="search-result__container">
        {this.state.results.length === 0 ? (
          <div>No results</div>
        ) : (
          this.state.results.map((result, index) => (
            <div key={index}>
              <div className="result__name">{result.name}</div>
              <div className="result__description">{result.description}</div>
            </div>
          ))
        )}
      </div>
    );
  }
}
