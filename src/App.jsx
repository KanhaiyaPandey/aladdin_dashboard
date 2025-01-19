
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddProduct from "./pages/AddProduct"
import Login from "./pages/Login"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
    // action: LoginAction(store),
  },

  {
    path: "/add-product",
    element: <AddProduct/>
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