import './App.css';
import MainPage from './MainPage';
import Introduction from './Introduction';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/Introduction`} element={<Introduction/>} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<MainPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
