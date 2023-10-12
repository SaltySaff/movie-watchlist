import { useEffect } from "react";

export default function SearchBar({searchValue, setSearchValue, search, setPrevSearchValue, setCurrentMovies}) {
  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  console.log(searchValue)

  function handleSearch() {
    setPrevSearchValue(searchValue)
    setSearchValue('')
    setCurrentMovies([])
    search(searchValue, 1)
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
