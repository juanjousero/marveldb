import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './components/Home';
import { Characters } from './components/Characters';
import { Comics } from './components/Comics';
import { Search } from './components/Search';
import { HeroDetail } from './components/HeroDetail'
import { ComicDetail } from './components/ComicDetail';

export const url = 'https://gateway.marvel.com/';
export const endpoint = 'v1/public/characters';
export const publicKey = 'd59ca3291ebcdb54a6ed7cc05783f47e';
export const searchParams = `?apikey=${publicKey}`;

export function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/characters' element={<Characters />}></Route>
        <Route path='/characters/:id' element={<HeroDetail />}></Route>
        <Route path='/comics' element={<Comics />}></Route>
        <Route path='/comics/:id' element={<ComicDetail />}></Route>
        <Route path='/search' element={<Search />}></Route>
      </Routes>
    </div>
  );
}
