import Search from '../react-components/search';
import SearchResult from '../react-components/searchResult';
import { Component } from 'react';
import { IPlanet, SwapiData } from './types/apiRoot';
import './styles/app.css';

interface AppProps {}

interface AppState {
  searchResults: IPlanet[];
  isLoaded: boolean;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchResults: [],
      isLoaded: false,
    };
  }

  handleSearch = async (url: string) => {
    try {
      this.setState({ isLoaded: false });
      const response = await fetch(url);
      const data: SwapiData = await response.json();
      this.setState({ searchResults: data.results, isLoaded: true });
    } catch (error) {
      console.error('Error fetching data: ', error);
      this.setState({ isLoaded: true });
    }
  };

  handleDataLoaded = (data: IPlanet[]) => {
    this.setState({ searchResults: data, isLoaded: true });
  };

  componentDidMount() {
    const searchTermSaved = localStorage.getItem('searchTermSaved');
    if (searchTermSaved) {
      this.handleSearch(
        `https://swapi.dev/api/planets/?search=${searchTermSaved}`
      );
    } else {
      this.handleSearch('https://swapi.dev/api/planets/');
    }
  }

  render = () => {
    const { searchResults, isLoaded } = this.state;

    return (
      <div className="container">
        <Search
          onSearch={this.handleSearch}
          onDataLoaded={this.handleDataLoaded}
        />
        {isLoaded ? (
          <SearchResult results={searchResults} />
        ) : (
          <div className="loader">Loading...</div>
        )}
      </div>
    );
  };
}
