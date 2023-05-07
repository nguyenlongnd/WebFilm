import './App.scss';
import { Route } from "react-router-dom";
import { Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Home from './pages/Home';
import "swiper/css";
import { useContext } from 'react';
import { ThemeContext } from './store/contexts/themeContext';
import Footer from './components/layouts/Footer';
import Movies from './pages/Movies';
import TvSeries from './pages/TvSeries';
import Search from './pages/Search.js';
import DetailItem from './pages/DetailItem';

function App() {
  const {themeMode} = useContext(ThemeContext)
  return (
    <div className={`app ${themeMode.name}`}>
      <Header />
      <div className='main_content'>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movie" element={<Movies />}/>
          <Route path="/tv" element={<TvSeries />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/:category/:id" element={<DetailItem />}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App;
