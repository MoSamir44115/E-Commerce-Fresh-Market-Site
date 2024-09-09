import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import Categories from './components/Categories/Categories'
import UserContextProvider from './Context/UserContext'
import Protectedroute from './components/Protectedroute/Protectedroute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ParticlesComponent from './components/TsPart/TsPart'
import SubCategory from './components/SubCategory/SubCategory'
import UcartContextProvider from './Context/LogCartContext'
import { Toaster } from 'react-hot-toast'
import CheckOut from './components/CheckOut/CheckOut'
import Orders from './components/Orders/Orders'

let query = new QueryClient()

let x = createHashRouter([
  {
    path: '',
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: (
          <Protectedroute>
            <Home />
          </Protectedroute>
        )
      },
      {
        path: 'categories',
        element: (
          <Protectedroute>
            <Categories />
          </Protectedroute>
        )
      },
      {
        path: 'brands',
        element: (
          <Protectedroute>
            <Brands />{' '}
          </Protectedroute>
        )
      },
      {
        path: 'cart',
        element: (
          <Protectedroute>
            <Cart />
          </Protectedroute>
        )
      },
      {
        path: 'products',
        element: (
          <Protectedroute>
            <Products />
          </Protectedroute>
        )
      },
      { path: 'login', element: <Login></Login> },
      { path: 'register', element: <Register></Register> },
      {
        path: 'productdetails/:id/:category',
        element: (
          <Protectedroute>
            <ProductDetails></ProductDetails>
          </Protectedroute>
        )
      },
      {
        path: 'subcategory/:id/:category',
        element: (
          <Protectedroute>
            <SubCategory></SubCategory>
          </Protectedroute>
        )
      },
      {
        path: 'checkout',
        element: (
          <Protectedroute>
            <CheckOut />
          </Protectedroute>
        )
      },
      {
        path: 'Allorders',
        element: (
          <Protectedroute>
            <Orders />
          </Protectedroute>
        )
      },
      { path: '*', element: <NotFound></NotFound> }
    ]
  }
])

function App () {
  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <UcartContextProvider>
          <RouterProvider router={x}></RouterProvider>
          <ReactQueryDevtools initialIsOpen='false' />
          <Toaster></Toaster>
        </UcartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  )
}

export default App
