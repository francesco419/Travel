import './App.css';
import MainPage from './Page/MainPage.js';
import Asia from './Page/Asia.js';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/Asia`} element={<Asia/>} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<MainPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
