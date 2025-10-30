/* eslint-disable react/prop-types */
import { useEffect } from "react"
import SizeGuide from "../microCompos/product/SizeGuide"

const OtherDetails = ({productData, setProductData}) => {
    useEffect(() =>{
       console.log(productData);
       
    }, [productData])
  return (
    <div className="w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className="text-xl font-semibold">Other Details</h1>

      <div className="w-full flex flex-col gap-2">
        <p className="text-gray-500">Size Guide</p>

          <SizeGuide setProductData={setProductData} productData={productData}/>

      </div>
    </div>
  )
}

export default OtherDetails