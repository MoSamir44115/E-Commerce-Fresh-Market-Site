import { data } from 'autoprefixer'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export let UcartContext = createContext()

export default function UcartContextProvider (props) {
  let [cart, setCart] = useState(null)
  let [cartId , setCartId] = useState(0)

  let headers = {
    token: localStorage.getItem('userToken')
  }

  function getLoggedUserCart () {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
      })
      .then(response => 
      {
        setCartId(response.data.data._id)
        return response
      }
        )
      .catch(error => error)
  }
  function deleteProductItem (productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers
      })
      .then(response => response)
      .catch(error => error)
  }

  function clearCart () {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
      })
      .then(response => response)
      .catch(error => error)
  }

  function addProductToCart (productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId
        },
        {
          headers
        }
      )
      .then(response => {
        setCart(data.numOfCartItems)
        return response}

      )
      .catch(error => error)

  }

  function updateProductCartCount (productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count
        },
        {
          headers
        }
      )
      .then(response => response)
      .catch(error => error)
  }

  function checkOut (cartId, url, formValues) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formValues
        },
        {
          headers,
          cartId : cartId
        }
      )
      .then(response => response)
      .catch(error => error)
  }

  function allOrders (productId) {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/orders/users/${productId}}`,
        {
          headers
        }
      )
      .then(response => response)
      .catch(error => error)
  }

  async function getCart () {
    let response = await getLoggedUserCart()
    console.log(response.data)
    setCart(response?.data)
  }

  useEffect(() => {
    getCart();
  }, {})

  return (
    <UcartContext.Provider
      value={{
        cartId,
        cart,
        setCart,
        clearCart,
        getLoggedUserCart,
        addProductToCart,
        updateProductCartCount,
        deleteProductItem,
        checkOut,
        allOrders
      }}
    >
      {props.children}
    </UcartContext.Provider>
  )
}
