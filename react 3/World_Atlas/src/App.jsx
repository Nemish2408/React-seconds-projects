import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppLayout from './components/Layout/AppLayout'

import "./App.css"

import Home from './pages/Home'
import About from './pages/About'
import Country from './pages/Country'
import Contact from './pages/Contact'
import ErrorPages from './pages/ErrorPages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPages />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "country",
        element: <Country />,
      },
      {
        path: "contact",
        element: <Contact />,
      }]
  },
])
const App = () => {
  return <RouterProvider router={router}></RouterProvider>
};

export default App;
