import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/authentication/login-user/Login.jsx';
import Register from './pages/authentication/register-user/Register.jsx';
import Home from './pages/sales-layouts/Home.jsx';
import LoginAdmin from './pages/authentication/login-admin/LoginAdmin.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
    ]
  },
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/admin",
    element: <LoginAdmin />
  },
  {
    path: "/register",
    element: <Register />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)