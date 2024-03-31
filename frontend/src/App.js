import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer';
import MainPage from './components/WordAnalyzer/Mainpage'
import Analyzer from './components/Visualizer/MainPage2';
import Recommendation from './components/Recommendation/Recommendation'


function App() {

  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    //Routing through all the components
    <div className={`container ${theme}`}>
      <Router>
        <Navbar theme={theme} setTheme={setTheme}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/analyzer' element={<Analyzer />} />
          <Route path='/recommender' element={<Recommendation />} />
        </Routes>
        <Footer />
      </Router>
    </div>


  );
}

export default App; 
