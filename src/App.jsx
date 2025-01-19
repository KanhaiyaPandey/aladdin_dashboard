import { useEffect } from "react"
import Landing from "./pages/Landing"
import axios from "axios"
import AddProduct from "./pages/AddProduct"


const App = () => {
  

  

  return (
    <div className=" w-screen bg-[#FBFBFB] grid grid-cols-1 gap-y-4 items-center justify-center">
      <AddProduct/>
    </div>
  )
}

export default App