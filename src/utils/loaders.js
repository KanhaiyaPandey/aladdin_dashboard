import toast from "react-hot-toast";
import { redirect } from "react-router-dom";
import { authFetch, customFetch, publicFetch } from "./Helpers";
import { loginUser } from "../assets/features/userSlice";
import { fetchCategories, selectCategoriesCacheValid, selectCategories } from "../assets/features/categorySlice";
import { fetchProducts, selectProductsCacheValid, selectProducts } from "../assets/features/productSlice";
import { fetchWarehouses, selectWarehousesCacheValid, selectWarehouses } from "../assets/features/warehouseSlice";



  export const userAuthLoader = (store) => async () => {
    try {
      const response = await customFetch.get("/validate-token");

      if (response.data.success) {
        const user = response.data.data;
        store.dispatch(loginUser({ user }));

        if (user && !user.roles.includes("ADMIN")) {
          toast.error("You are not authorized");
          return redirect("/login");
        }
      } else {
        toast.error("You must be logged to access this route");
        return redirect("/login");
      }
    } catch (error) {
      console.error("Auth validation error:", error);
      toast.error("Session expired");
      return redirect("/login");
    }

    return null;
  };

export const UpdateProductLoader = (store) => async ({params}) =>{
      // Check cache first
      const state = store.getState();
      const categoriesCacheValid = selectCategoriesCacheValid(state);
      const productsCacheValid = selectProductsCacheValid(state);
      const warehousesCacheValid = selectWarehousesCacheValid(state);
      
      // Fetch product (always fetch for update page)
      const response = await customFetch.get(`/product/${params.id}`);
      const product = response.data.data;
      
      // Fetch categories only if cache is invalid
      let categories = selectCategories(state);
      if (!categoriesCacheValid || categories.length === 0) {
        await store.dispatch(fetchCategories());
        categories = selectCategories(store.getState());
      }
      
      // Fetch warehouses only if cache is invalid
      let warehouses = selectWarehouses(state);
      if (!warehousesCacheValid || warehouses.length === 0) {
        await store.dispatch(fetchWarehouses());
        warehouses = selectWarehouses(store.getState());
      }
      
      // Fetch products only if cache is invalid
      let allProducts = selectProducts(state);
      if (!productsCacheValid || allProducts.length === 0) {
        await store.dispatch(fetchProducts());
        allProducts = selectProducts(store.getState());
      }
      
      return({product, categories, warehouses, allProducts});
}

export const warehouseLoader = (store) => async () =>{
    try {
        // Check cache first
        const state = store.getState();
        const warehousesCacheValid = selectWarehousesCacheValid(state);
        
        let warehouses = selectWarehouses(state);
        if (!warehousesCacheValid || warehouses.length === 0) {
          await store.dispatch(fetchWarehouses());
          warehouses = selectWarehouses(store.getState());
        }
        
        return { warehouses };
    } catch (error) {
        console.error("Failed to load warehouses:", error);
        toast.error("Failed to load warehouses");
        return { warehouses: [] };
    }
}

export const createProductLoader = (store) => async () =>{
    // Check cache first
    const state = store.getState();
    const categoriesCacheValid = selectCategoriesCacheValid(state);
    const productsCacheValid = selectProductsCacheValid(state);
    const warehousesCacheValid = selectWarehousesCacheValid(state);
    
    // Fetch categories only if cache is invalid
    let loaderCategories = selectCategories(state);
    if (!categoriesCacheValid || loaderCategories.length === 0) {
      await store.dispatch(fetchCategories());
      loaderCategories = selectCategories(store.getState());
    }
    
    // Fetch warehouses only if cache is invalid
    let warehouses = selectWarehouses(state);
    if (!warehousesCacheValid || warehouses.length === 0) {
      await store.dispatch(fetchWarehouses());
      warehouses = selectWarehouses(store.getState());
    }
    
    // Fetch products only if cache is invalid
    let allProducts = selectProducts(state);
    if (!productsCacheValid || allProducts.length === 0) {
      await store.dispatch(fetchProducts());
      allProducts = selectProducts(store.getState());
    }
    
    return({loaderCategories, warehouses, allProducts});
}

export const allProductsLoader = (store) => async () =>{
    // Check cache first
    const state = store.getState();
    const productsCacheValid = selectProductsCacheValid(state);
    
    let products = selectProducts(state);
    if (!productsCacheValid || products.length === 0) {
      await store.dispatch(fetchProducts());
      products = selectProducts(store.getState());
    }
    
    return({products});
}



export const ordersLoader = async () =>{
    const response = await customFetch.get("/orders/all");
    if(response.data.success){
       const orders = response.data.data;
      return {orders}
    }
    return [];
}