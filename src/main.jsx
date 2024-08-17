import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Root from './components/Root/Root.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import AuthProvider from './components/Provider/AuthProvider.jsx';
import Profile from './components/Profile/Profile.jsx';
import AddProduct from './components/AddProduct/AddProduct.jsx';
import Details from './components/AllProduct/Details.jsx';
import Cart from './components/Cart/Cart.jsx';
import AllProductTable from './components/AllProductTable/AllProductTable.jsx'; 
import ProductUpdate from './components/AllProductTable/ProductUpdate.jsx';
import OrderInfo from './components/OrderInfo/OrderInfo.jsx';
import MyOrder from './components/MyOrder/MyOrder.jsx';
import AllOrder from './components/AllOrder/AllOrder.jsx';
import AllUsers from './components/AllUsers/AllUsers.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/profile',
        element: <Profile></Profile>
      },
      {
        path: '/addProduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: '/details/:id',
        element: <Details></Details>
      },
      {
        path: '/updateProduct/:id',
        element: <ProductUpdate></ProductUpdate>
      },
      {
        path: '/cart',
        element: <Cart></Cart>
      },
      {
        path: '/allDataTable',
        element: <AllProductTable></AllProductTable>
      },
      {
        path: '/orderInfo',
        element: <OrderInfo></OrderInfo>
      },
      {
        path: '/myOrders',
        element:  <MyOrder></MyOrder>
      },
      {
        path: '/allOrders',
        element:  <AllOrder></AllOrder>
      },
      {
        path: '/allUsers',
        element: <AllUsers></AllUsers>
      },
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  },

]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
