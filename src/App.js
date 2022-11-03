import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage'
import AdvocatePageList from './pages/AdvocatePageList'
import AdvocatePage from './pages/AdvocatePage'
import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route element={<AdvocatePageList/>} path="/" />
          <Route element={<AdvocatePageList/>} path="/advocates/" />
          <Route element={<AdvocatePage />} path="/advocates/:username/:page/"  />
        </Routes>
      </Router>
      
  );
}

export default App;
