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
import PrivetRoute from './SecureRoute/PrivetRoute.jsx';
import AdminRoute from './SecureRoute/AdminRoute.jsx';
import AdminAndModeratorRoute from './SecureRoute/AdminAndModeratorRoute.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <PrivetRoute>
          <Home></Home>
        </PrivetRoute>
      },
      {
        path: '/profile',
        element: <PrivetRoute>
          <Profile></Profile>
        </PrivetRoute>
      },
      {
        path: '/addProduct',
        element: <PrivetRoute>
          <AdminAndModeratorRoute>
          <AddProduct></AddProduct>
          </AdminAndModeratorRoute>
        </PrivetRoute>
      },
      {
        path: '/details/:id',
        element: <PrivetRoute>
          <Details></Details>
        </PrivetRoute>
      },
      {
        path: '/updateProduct/:id',
        element: <PrivetRoute>
          <AdminAndModeratorRoute>
          <ProductUpdate></ProductUpdate>
          </AdminAndModeratorRoute>
        </PrivetRoute>
      },
      {
        path: '/cart',
        element: <PrivetRoute>
          <Cart></Cart>
        </PrivetRoute>
      },
      {
        path: '/allDataTable',
        element: <PrivetRoute>
          <AdminAndModeratorRoute>
          <AllProductTable></AllProductTable>
          </AdminAndModeratorRoute>
        </PrivetRoute>
      },
      {
        path: '/orderInfo',
        element: <PrivetRoute>
          <OrderInfo></OrderInfo>
        </PrivetRoute>
      },
      {
        path: '/myOrders',
        element: <PrivetRoute>
          <MyOrder></MyOrder>
        </PrivetRoute>
      },
      {
        path: '/allOrders',
        element: <PrivetRoute>
          <AdminAndModeratorRoute>
          <AllOrder></AllOrder>
          </AdminAndModeratorRoute>
        </PrivetRoute>
      },
      {
        path: '/allUsers',
        element: <PrivetRoute>
          <AdminRoute>
          <AllUsers></AllUsers>
          </AdminRoute>
        </PrivetRoute>
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
