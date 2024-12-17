import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Deck from './Deck.tsx'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/deck/:id" element={<Deck />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
