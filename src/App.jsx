
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddProduct from "./pages/AddProduct"
import Login from "./pages/Login"
import UpdateProduct from './pages/UpdateProduct'
import AllProducts from './pages/AllProducts'
import Dashboard from './pages/Dashboard'
import AdminSection from './components/dashboardCompos/AdminSection'
import Error from './pages/Error'


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/update-product/:productId",
    element: <UpdateProduct />
  },
  {
    path: "/",
    element: <Dashboard/>,
    errorElement: <Error/>,
    children:[
      {
        index:true,
        path:"overview",
        element:<AdminSection /> ,
      },
        {
          path: "all-product",
          element: <AllProducts/>,
      },     
       {
          path: "add-product",
          element: <AddProduct/>,
       },
    ]
  }
  
])


const App = () => {
  

  

  return (
    <div className=" w-screen bg-[#FBFBFB] grid grid-cols-1 gap-y-4 items-center justify-center">
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App