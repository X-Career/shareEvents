import { useState } from 'react'
import './App.css'

import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import AppHeader from './components/Header/Header';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Events from './pages/Events/Events';
import Event from './pages/Event/Event';
import SuccessPage from './pages/Users/SuccessPage';
import EventRegistrationForm from './pages/CreateAnEvent/Create';
// import { Footer, Header } from 'antd/es/layout/layout';
import Routers from './routers/routers';

// const Layout = () => {
//     return (
//       <div className="app">
//         <AppHeader />
//         <Outlet />
//       </div>
//     );
//   };
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <Home />,
  //       },
  //       {
  //         path: "/events/:_id",
  //         element: <Events />,
  //       },
  //       {
  //         path: "/event/:_id",
  //         element: <Event />,
  //       },
  //       {
  //         path: "/login",
  //         element: <Login />,
  //       },
  //       {
  //         path: "/register",
  //         element: <SignUp />,
  //       },
  //       {
  //         path: "/success",
  //         element: <SuccessPage />,
  //       },
  //       {
  //         path: "/createAnEvent",
  //         element: <EventRegistrationForm />,
  //       }
  //     ],
  //   },
  // ]);
  function App() {
    return (
      <div className="App">
        <Routers/>
      </div>
    );
}

export default App
