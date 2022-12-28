import "./App.css";
import MainPage from "./Page/MainPage.js";
import Asia from "./Page/Asia.js";
import Country from "./Page/Country";
import Customer from "./Page/Customer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Country/:id" element={<Country />} />
        <Route path="/Customer/" element={<Customer />} />
        <Route path="/Asia" element={<Asia />} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
