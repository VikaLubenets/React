import './App.css';
import Search from '../react-components/search';
import SearchResult from '../react-components/searchResult';

function App() {
  return (
    <div className="container">
      <Search />
      <SearchResult />
    </div>
  );
}

export default App;
