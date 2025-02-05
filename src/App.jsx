
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddProduct from "./pages/AddProduct"
import Login from "./pages/Login"
import UpdateProduct from './pages/UpdateProduct'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },

  {
    path: "/add-product",
    element: <AddProduct/>
  },
  {
    path: "/update-product",
    element: <UpdateProduct/>
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