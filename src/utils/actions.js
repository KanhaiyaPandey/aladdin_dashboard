import toast from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { authFetch } from './Helpers';
import { loginUser } from '../assets/features/userSlice';


export const LoginAction = (store) => async ({request}) =>{

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await authFetch.post('login', data);
      const user = response?.data?.data;
      console.log(user);
      store.dispatch(loginUser({ user }));        
      toast.success('logged in successfully');
      return redirect('/overview');
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials';
      toast.error(errorMessage);
      return null;
    }
}


// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }



