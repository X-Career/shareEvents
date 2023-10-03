import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import AppHeader from './components/Header/Header';
import Events from './pages/Events/Events';
import Event from './pages/Event/Event';
import SuccessPage from './pages/Users/SuccessPage';
// import { Footer, Header } from 'antd/es/layout/layout';



  const Layout = () => {
    return (
      <div className="app">
        <AppHeader />
        <Outlet />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/events/:id",
          element: <Events />,
        },
        {
          path: "/event/:id",
          element: <Event />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <SignUp />,
        },
        {
          path: "/success",
          element: <SuccessPage />,
        }
      ],
    },
  ]);
  function App() {
    return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
    );
}

export default App
