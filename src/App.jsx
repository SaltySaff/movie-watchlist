import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./components/WatchlistContext";
import Layout from "./components/Layout";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";


function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Search />} />
            <Route path="watchlist" element={<Watchlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;
