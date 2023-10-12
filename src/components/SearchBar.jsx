export default function SearchBar({searchValue, setSearchValue, search}) {
  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSearch() {
    setSearchValue('')
    search()
  }

  function handleKeyDown(e) {
    console.log('key down')
    if(e.key === 'Enter') {
      handleSearch()
    }
  }
  
  return (
    <div className="search">
      <input
        id="search-bar"
        className="search-bar"
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchValue}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
