import { useState } from "react";
import { createContext,useContext } from "react";
import axios from "axios"
import { useEffect } from "react";
const productContext=createContext()
function ProductContextAPI({children}){
    const [products,setProducts]=useState([])
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=async()=>{
        const response=await axios('https://dummyjson.com/products?limit=0')
        setProducts(response.data.products)
    }
    return(
        <productContext.Provider value={{products,setProducts}}>
            {children}
        </productContext.Provider>
    )
}

export const useProduct=()=>{
    return useContext(productContext)
}
export default ProductContextAPI