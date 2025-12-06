
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
import { allProductsLoader, createProductLoader, UpdateProductLoader, userAuthLoader, warehouseLoader } from './utils/loaders'
import Order from './pages/Order'
import Categories from './pages/Categories'
import Collections from './pages/Collections'
import CreateCategory from './pages/CreateCategory'
import CreateCollection from './pages/CreateCollection'
import UpdateCategory from './pages/UpdateCategory'
import Customers from './pages/Customers'
import Warehouse from './pages/Warehouse'


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
          path: "products",
          element: <AllProducts/>,
          loader:allProductsLoader(store),
      },     
       {
          path: "products/add-product",
          element: <AddProduct/>,
          loader:createProductLoader(store),
       },
         {
          path: "products/update-product/:id",
          element: <UpdateProduct />,
          loader:UpdateProductLoader(store),
        },
         {
          path: "/categories",
          element: <Categories />,
        },
         {
          path: "/categories/create-category",
          element: <CreateCategory activePage="create catgeory" />,
        },
        {
          path: "/categories/create-subcategory/:id",
          element: <CreateCategory activePage="subcategory" />,
        },
        {
          path: "/categories/update-category/:id",
          element: <UpdateCategory activePage="update catgeory" />,
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
          path: "/customers",
          element: <Customers/>
        },

        {
          path: "/warehouses",
          element: <Warehouse/>,
          loader:warehouseLoader(store)
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