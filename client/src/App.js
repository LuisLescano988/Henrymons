import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from './components/Landing/index.jsx'
import Home from './components/Home/index.jsx';
import Detail from './components/Detail/index.jsx'
import PokeCreate from './components/PokeCreate/index'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/' element = {<Landing/>}/>
        <Route path = '/home' element = {<Home/>}/>
        <Route path = '/pokemons/:id' element = {<Detail/>}/>
        <Route path = '/pokemons' element = {<PokeCreate/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
