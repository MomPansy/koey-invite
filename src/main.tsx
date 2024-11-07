import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import App from './App.tsx'
import { Accepted } from './routes/Accept.tsx'
import { Birthday } from './routes/Birthday.tsx'
import { GF, Proposal } from './routes/GF.tsx'
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/koey-invite/" element={<App />} />,
    <Route path="/koey-invite/birthday" element={<Birthday />} />,
    <Route path="/koey-invite/accepted" element={<Accepted />} />,
    <Route path="/koey-invite/gf" element={<GF/>} />,
    <Route path="/koey-invite/gf/proposal" element={<Proposal/>} />
  ])
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
