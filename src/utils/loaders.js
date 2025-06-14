import toast from "react-hot-toast";
import { redirect } from "react-router-dom";



export const userAuthLoader = (store) => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }

  if (user && !user.roles.includes("ADMIN")) {
      toast.warn('You are not authorized');
      return redirect('/login');
  }
  console.log("user:", user);
  

  return null;
};
