import toast from "react-hot-toast";
import { redirect } from "react-router-dom";
import { authFetch, publicFetch } from "./Helpers";
import { loginUser } from "../assets/features/userSlice";



export const userAuthLoader = (store) => async () => {

    const response = await authFetch.get("/validate-token");
     if (response.data.success) {
          const user = response.data.data   
          store.dispatch(loginUser({ user }));  
            if (user && !user.roles.includes("ADMIN")) {
            toast.error('You are not authorized');
            return redirect('/login');
            }
     }else{
      toast.error('You must be logged in to checkout');
      return redirect('/login');          
     }
    return null;
};

export const UpdateProductLoader = async ({params}) =>{
      const response = await publicFetch.get(`/product/${params.id}`);
       const product = response.data.data;
       return({product});
}