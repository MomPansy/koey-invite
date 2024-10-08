import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import App from './App.tsx'
import { Accepted } from './Accept.tsx'
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/koey-invite/" element={<App />} />,
    <Route path="/accepted" element={<Accepted />} />
  ])
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
