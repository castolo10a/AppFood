import {Route, Routes, useLocation} from 'react-router-dom';
import {Detail, Form, Home, Landing} from './views/index';
import Nav from './components/Nav/Nav';

function App() {
  const location = useLocation()

  return (
    <div>
      {location.pathname === "/" ? <Landing/> : <Nav/>}
      <Routes>
        <Route path='/Home' element={<Home />}/>
        <Route path='/CreateRecipe' element={<Form />}/>
        <Route path="/Detail/:id" element={<Detail />}/>
      </Routes>
    </div>
  );
}

export default App;
