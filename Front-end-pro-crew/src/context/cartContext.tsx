import React, {createContext, useState} from "react";

export const CartContext = React.createContext("hello")
// export function ContextProvider(props: any){
   
//     const [price,setPrice]= useState(0)

//     return (
//         <CartContext.Provider value={{price,setPrice}}>
//             {props.children}
//         </CartContext.Provider>
//         )

// }