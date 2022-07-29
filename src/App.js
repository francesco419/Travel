import './App.css';
import MainPage from './Page/MainPage';
import Introduction from './Page/Introduction';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/MainPage`} element={<MainPage/>} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Introduction/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
