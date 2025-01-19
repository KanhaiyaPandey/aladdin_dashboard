import toast from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { customFetch } from './Helpers';

export const LoginAction = (store) => async ({request}) =>{

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post('/auth/local', data);
      toast.success('logged in successfully');
      return redirect('/');
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials';
      toast.error(errorMessage);
      return null;
    }
}