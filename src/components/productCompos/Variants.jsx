/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import RecursiveVariantTree from "../microCompos/product/RecursiveVariantTree"


const Variants = ({productData, setProductData}) => {
  return (
    <div className="w-full  flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl  border shadow-md">
         <h1 className=" text-xl font-semibold ">Variants</h1> 

         <div className=" w-full flex flex-col gap-2">
          <RecursiveVariantTree variants={productData.variants}/>
         </div>
    </div>
  )
}

export default Variants