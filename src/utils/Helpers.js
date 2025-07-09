import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const variant = {
//     options:[],
//     costPrice:"",
//     compareAtPrice:"",
//     variantMedias:[],
//     variantWarehouseData:[]
// }

//   "costPrice": 290.0,
//       "sellPrice": 479.99,
//       "compareAtPrice": 549.99,
//       "variantMedias": 
// variantWarehouseData



export const customFetch = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/admin`,
    withCredentials: true, // Ensures cookies are sent
});

export const userFetch = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/user`,
    withCredentials: true, // Ensures cookies are sent
});

export const publicFetch = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/public`,
    withCredentials: true, // Ensures cookies are sent
});

export const authFetch = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/user`,
    withCredentials: true, // Ensures cookies are sent
});


export const generateCombinations = (arrays) => {
    if (arrays.length === 0) return [];
    return arrays.reduce((acc, curr) =>
      acc.flatMap((a) => curr.map((b) => [...a, b]))
    , [[]]);
  };

  export const getCategory = async () =>{
    
    

}






