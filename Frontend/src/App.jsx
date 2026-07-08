import React from 'react';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx';
import MainLayout from './Components/MainLayout';
import Predictionlayout from './Components/Predictionlayout.jsx';
import Editprofile from './Pages/Editprofile.jsx'
import PricePred from './Pages/PricePred.jsx';
import Recommandlayout from './Components/Recommandlayout.jsx';
import Recommform from './Pages/Recommform.jsx';
import Comparelayout from './Components/Comparelayout.jsx';
import Compareform from './Pages/Compareform.jsx';
import Profile from './Pages/Profile.jsx';
import { Toaster } from 'sonner';
import Changepassword from './Pages/Changepassword.jsx';
import Protected from './Components/Protected.jsx';
// import ForgotPassword from './Pages/Forgetpassword.jsx';
// import ResetPassword from './Pages/Resetpassword.jsx';

const browserRouter = createBrowserRouter([
  {
    path:'/',
    element:<Protected><MainLayout/></Protected>,
  },
  {
    path:'/Predict',
    element:<Protected><Predictionlayout/></Protected>,
  },
  {
    path:'/login',
    element:<Login/>
  },
  // {
  //   path: "/forgot-password",
  //   element: <ForgotPassword />,
  // },
  // {
  //   path: "/reset-password/:token",
  //   element: <ResetPassword />,
  // },
  {
    path:'/PricePrediction',
    element:<Protected><PricePred/></Protected>
  },
  {
    path:'/Recommendation',
    element:<Protected><Recommform/></Protected>
  },
  {
    path:'/Compare',
    element:<Protected><Comparelayout /></Protected>
  },
  {
    path : '/Recommend',
    element:<Protected><Recommandlayout/></Protected>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/CompareLaptop',
    element:<Protected><Compareform/></Protected>
  },
  {
    path:'/Profile',
    element:<Protected><Profile/></Protected>
  },
  {
    path:'/EditProfile',
    element:<Protected><Editprofile/></Protected>
  },
  {
    path:'/changepassword',
    element:<Protected><Changepassword/></Protected>
  }
])

const App = () => {
  return (
    <>
    <RouterProvider router={browserRouter} />
    <Toaster position="top-right" richColors />
    </>
  );
};

export default App;
