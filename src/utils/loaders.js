import toast from "react-hot-toast";
import { redirect } from "react-router-dom";
import { customFetch, publicFetch } from "./Helpers";



export const userAuthLoader = (store) => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.error('You must be logged in to checkout');
    return redirect('/login');
  }

  if (user && !user.roles.includes("ADMIN")) {
      toast.error('You are not authorized');
      return redirect('/login');
  }
  console.log("user:", user);
  

  return null;
};

export const UpdateProductLoader = async ({params}) =>{
      const response = await publicFetch.get(`/product/${params.id}`);
       const product = response.data.data;
       console.log(product);
       
       return({product});
}