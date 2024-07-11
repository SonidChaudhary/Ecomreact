import React from "react";
import { useCart } from "../context/CartContext";
import "../css/Cart.css";
function Cart() {
  const { cartItems, setCartItems } = useCart();
// console.log(cartItems);
  const removeItem=(item)=>{
    setCartItems((prev)=>{
      const newCart=prev.filter(element=>element.id !==item.id)
      return newCart
    })
  }
  return (
    <>
     
      <section className="cart">
        {
          cartItems.length===0 && <h1 className="empty">CART IS EMPTY</h1>
        }
        {cartItems.map((item) => {
          return (
            <div className="item" style={{border: "1px solid red",margin:"4px"}}>
              <img
                src={item.images[0]}
                alt={item.title}
                height={"200px"}
                width={"200px"}
              />
              
              <h5>{item.title}</h5>
              <div style={{display:"flex",alignItems:"Center",justifyContent:"center",flexDirection:"row"}}>
              <div className="btn">
                <button>+</button>
                <b>{item.count}</b>
                <button>-</button>
              </div>
              <br />
              <h3>{item.price}$</h3>
              <br />
              <br />
              <button className="remove-btn" onClick={()=>removeItem(item)} >Delete</button>
            </div>

              </div>
              
          );
        })}
 </section>
    </>
  );
}

export default Cart;