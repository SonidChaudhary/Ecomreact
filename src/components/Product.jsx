import React, { useEffect, useReducer, useState } from 'react';
import { useProduct } from '../context/ProductContext';
import "../css/Product.css";
import { useCart } from '../context/CartContext';
import productReducer from '../reducers/ProductReducer';

const Product = () => {
  const { products } = useProduct();
  const { cartItems, setCartItems } = useCart();
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue]= useState("")
  const [filterCategories, setFilterCategories]=useState([])
  const [sortValue, setsortValue]=useState("")
  

  const [filteredProduct, dispatch] = useReducer(productReducer, []);


  useEffect(() => {
    dispatch({ type: "addProduct", payload: products })
    let categories=products.map(product=>product.category)
    setFilterCategories(categories.reduce((acc,ele)=>{
      if (!acc.includes(ele)){
        acc.push(ele)
      }
      return acc
    },[]))
  }, [products])

  

  useEffect(() => {
    let timer = setTimeout(() => {
      if (searchText) {
        console.log(searchText);
        dispatch({
          type: "search",
          payload: {
            searchText: searchText.toLowerCase(),
            products: products
          }
        });
      } else {
        dispatch({ type: "addProduct", payload: products });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, products]);


  useEffect(()=>{
    if (filterValue){
      dispatch({
        type:"filter",payload:{
          filterValue,products
        }
      })
    }
  },[filterValue])

useEffect(()=>{
  if(sortValue){
    dispatch({type:sortValue, payload:filteredProduct})
  }
},[sortValue])

  function addToCartHandler(items) {
    const isItemAvailable = cartItems.find((product) => product.id === items.id);
    if (isItemAvailable) {
      const newCartItems = cartItems.map((product) => {
        if (product.id === items.id) {
          product.count = product.count + 1;
        }
        return product;
      });
      setCartItems(newCartItems);
    } else {
      const newItem = { ...items, count: 1 };
      setCartItems([...cartItems, newItem]);
    }
  }

  return (
    <>
      <main className='product-page'>
        <aside className='product-aside'>
          <div className="search">
            <label htmlFor="search">Search</label>
            <input
              type="search"
              name="search"
              id="search"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
          <div className="filter">
                <h1>Filter Products</h1>
              <select name="filter" id="filter"
              onChange={(event)=>setFilterValue(event.target.value)}>
                <option value="">Filter...</option>
                {
                 filterCategories.map(category=>{
                  return(
                    <option value={category} key={category}>{category}</option>
                  )
                 })

                }
              </select>
          </div>
          
          <div className="sort">
            <h1>Sort</h1>
             <select name="sort" id="sort" onChange={(e)=> setsortValue(e.target.value)}>
             <option value="">Select</option>
              <option value="all">All</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="h-l">high to low</option>
              <option value="l-h">low to high</option>
              

            </select>
          </div>

        </aside>
        <section className='products'>
          {filteredProduct.map((product,index) => {
            return (
              <div className="card" key={index+1}>
                <img src={product.images[0]} alt="product" />
                <h2>{product.title}</h2>
                <h3>{product.brand}</h3>
                <h3>{product.price}</h3>
                <div className="buttons">
                  <button>Buy Now</button>
                  <button onClick={() => addToCartHandler(product)}>Add To Cart</button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Product;
