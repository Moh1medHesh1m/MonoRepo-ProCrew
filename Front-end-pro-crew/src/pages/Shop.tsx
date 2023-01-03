
import React, { SyntheticEvent, useContext, useState } from 'react'
import { Alert, Table } from 'react-bootstrap'
import config from '../config';
import { CartContext } from '../context/cartContext'

// ===========================================================================

function reforme(obj: any) {
  return Object.entries(obj).map(([key, value]: any, i) => value
  )
}

// ---------------------------------------------------------------------------

function calculateTotal(arr: any): number {
  let totalPrice = 0;
  for (let index = 0; index < arr.length; index++) {
    totalPrice += arr[index].price * arr[index].quantity;
  }
  return totalPrice;
}

// ---------------------------------------------------------------------------

function Shop() {
  const { resId, setResId, title, setTitle, price, setPrice, list, setList }: any = useContext(CartContext)
  const products = reforme(list)
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch(`${config.backendApi}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ restaurant: resId, products, total: calculateTotal(products) })
    });

    const content = await response.json();
    alert("Thanks for ordering ")
  }

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>

            <th>Order</th>
            <th>Price</th>
            <th>Quantity</th>

          </tr>
        </thead>
        <tbody>

          {products.map((element: any) => (
            <tr>
              <td>{element.title}</td>
              <td>{element.price}</td>
              <td>{element.quantity}</td>
            </tr>
          ))}

        </tbody>
      </Table>
      <div>
        <>
          <h1>price</h1>
          <h1>{calculateTotal(products)}</h1>
          <button className="w-50 btn btn-lg btn-primary" onClick={submit } style={{ marginLeft: "50%" }}>checkout</button>
        </>
      </div>
    </>
  );

}

export default Shop