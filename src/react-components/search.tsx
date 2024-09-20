import { ChangeEvent, Component } from 'react';
import { IPlanet } from '../types/apiRoot';
import ButtonError from './errorButton';
import '../styles/search.css';

type SearchState = {
  searchTerm: string;
};

type SearchProps = {
  onSearch: (url: string) => Promise<void>;
  onDataLoaded: (data: IPlanet[]) => void;
};

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTermSaved') || '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const term = this.state.searchTerm.trim();
    let url;
    if (term) {
      url = `https://swapi.dev/api/planets/?search=${term}`;
      localStorage.setItem('searchTermSaved', term);
    } else {
      url = 'https://swapi.dev/api/planets/';
    }

    this.props.onSearch(url);
  };

  render() {
    return (
      <div className="search-line">
        <input
          type="search"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button className="search-button" onClick={this.handleSearch}>
          Search
        </button>

        <ButtonError />
      </div>
    );
  }
}
