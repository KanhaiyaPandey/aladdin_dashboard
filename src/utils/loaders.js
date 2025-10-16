import toast from "react-hot-toast";
import { redirect } from "react-router-dom";
import { authFetch, customFetch, publicFetch } from "./Helpers";
import { loginUser } from "../assets/features/userSlice";



  export const userAuthLoader = (store) => async () => {
    try {
      const response = await authFetch.get("/validate-token");

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

export const UpdateProductLoader = async ({params}) =>{
      const response = await publicFetch.get(`/product/${params.id}`);
       const product = response.data.data;
       return({product});
}

export const warehouseLoader = async () =>{
    try {
        const response = await customFetch.get('/warehouse/all');
        const warehouses = response.data.data;
        return { warehouses };
    } catch (error) {
        console.error("Failed to load warehouses:", error);
        toast.error("Failed to load warehouses");
        return { warehouses: [] };
    }
}

export const createProductLoader = async () =>{
    const categoryResponse = await publicFetch.get(`/category/all-categories`)
    const warehouseResponse = await customFetch.get(`/warehouse/all`);
    const loaderCategories = categoryResponse.data.data;
    const warehouses = warehouseResponse.data.data;
    return({loaderCategories, warehouses});
}

export const allProductsLoader = async () =>{
    const response = await publicFetch.get(`/product/all-products`);
    const products = response.data.data;
    return({products});
}



// export const createCategoryLoader = async ({params}) =>{
//     const response = await publicFetch.get(`/category`)
// }