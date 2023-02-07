import MainPage from "./Page/mainpage/MainPage.js";
import CountryList from "./Page/countryList/CountryList.js";
import Country from "./Page/country/Country";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Country/:cont/:id" element={<Country />} />
        <Route path="/CountryList" element={<CountryList />} />
        <Route path={`${process.env.PUBLIC_URL}`} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
