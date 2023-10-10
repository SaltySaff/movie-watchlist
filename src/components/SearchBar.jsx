export default function SearchBar({searchValue, setSearchValue, search}) {
  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSearch() {
    setSearchValue('')
    search()
  }
  
  return (
    <div className="search">
      <input
        id="search-bar"
        className="search-bar"
        type="text"
        onChange={handleChange}
        value={searchValue}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
