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

const browserRouter = createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
  },
  {
    path:'/Predict',
    element:<Predictionlayout/>,
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/PricePrediction',
    element:<PricePred/>
  },
  {
    path:'/Recommendation',
    element:<Recommform/>
  },
  {
    path:'/Compare',
    element:<Comparelayout />
  },
  {
    path : '/Recommend',
    element:<Recommandlayout/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/CompareLaptop',
    element:<Compareform/>
  },
  {
    path:'/Profile',
    element:<Profile/>
  },
  {
    path:'/EditProfile',
    element:<Editprofile/>
  },
  {
    path:'/changepassword',
    element:<Changepassword/>
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
