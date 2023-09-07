import "./App.css";
import Explore from "./components/Explore/Explore";
import HomePage from "./components/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import ListingDetailPage from "./components/ListingDetailPage/ListingDetailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<Explore />} />
        <Route path="/detail/:property_id" element={<ListingDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
