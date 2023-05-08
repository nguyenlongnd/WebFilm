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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaZlPDKVemmkzxEa0BPkogyKAJlAbT-x8",
  authDomain: "filmweb-5b9fa.firebaseapp.com",
  projectId: "filmweb-5b9fa",
  storageBucket: "filmweb-5b9fa.appspot.com",
  messagingSenderId: "789793526184",
  appId: "1:789793526184:web:7a8c408313b281ff920d9d",
  measurementId: "G-F0CLFGT3B5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
