import { ChangeEvent, Component } from 'react';

type SearchState = {
    searchTerm: string;
  };
  
export default class Search extends Component<{}, SearchState> {
    constructor(props: {}) {
      super(props);
      this.state = {
        searchTerm: localStorage.getItem('searchTerm') || '',
      };
    }
  
    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState({ searchTerm: event.target.value });
    };
  
    handleSearch = async () => {
      const term = this.state.searchTerm.trim();
      let url;
      if (term) {
        url = `https://swapi.dev/api/planets/?search=${term}`;
      } else {
        url = `https://swapi.dev/api/planets/`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      localStorage.setItem('searchTerm', term);
    };
  
    render() {
      return (
        <div className="search-line">
          <input type="search" value={this.state.searchTerm} onChange={this.handleInputChange} />
          <button onClick={this.handleSearch}>Search</button>
        </div>
      );
    }
  }