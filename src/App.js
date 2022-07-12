import './App.css';
import MainPage from './MainPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<MainPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
