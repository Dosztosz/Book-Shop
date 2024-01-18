import { useState } from 'react'
import Books from './pages/books';
import Add from './pages/Add';
import Update from './pages/Update';
import "./style.scss"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />}/>
          <Route path="/add" element={<Add />}/>
          <Route path="/update/:id" element={<Update />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
