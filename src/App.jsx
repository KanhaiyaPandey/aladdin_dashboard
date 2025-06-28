
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddProduct from "./pages/AddProduct"
import Login from "./pages/Login"
import UpdateProduct from './pages/UpdateProduct'
import AllProducts from './pages/AllProducts'
import Dashboard from './pages/Dashboard'
import AdminSection from './components/dashboardCompos/AdminSection'
import Error from './pages/Error'
import { LoginAction } from './utils/actions'
import { store } from './store'
import { UpdateProductLoader, userAuthLoader } from './utils/loaders'
import Order from './pages/Order'
import Categories from './pages/Categories'
import Collections from './pages/Collections'
import CreateCategory from './pages/CreateCategory'
import CreateCollection from './pages/CreateCollection'


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
    action:LoginAction(store),
  },
  {
    path: "/",
    element: <Dashboard/>,
    loader:userAuthLoader(store),
    errorElement: <Error/>,
    children:[
      {
        index:true, 
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
         {
          path: "/update-product/:id",
          element: <UpdateProduct />,
          loader:UpdateProductLoader,
        },
         {
          path: "/categories",
          element: <Categories />,
        },
         {
          path: "/categories/create-category",
          element: <CreateCategory />,
        },
         {
          path: "/collections",
          element: <Collections />,
        },
         {
          path: "/collections/create-collection",
          element: <CreateCollection />,
        },
        {
          path: "/orders",
          element: <Order />,
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