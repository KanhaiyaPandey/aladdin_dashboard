/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import RecursiveVariantTree from "../microCompos/product/RecursiveVariantTree"
import { CiEdit } from "react-icons/ci";
import { Modal } from "antd";
import VariantEdit from "./VariantEdit";



const Variants = ({productData, setProductData}) => {

  const [selectedVariantEdit, setSelectedVariantEdit] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() =>{
   console.log("selectedVariantEdit: ",selectedVariantEdit);
   
  },[selectedVariantEdit])

  const handleSave = () =>{
      const updatedProductVariants = productData.variants.map((variant) => {
        if (
          JSON.stringify(variant.options) === JSON.stringify(variantOptions)
        ) {
          return { ...variant, [field]: value };
        }
        return variant;
      });
      setProductData({ ...productData, variants: updatedProductVariants });
  }

  return (
    <div className="w-full  flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl  border shadow-md">
        
         <div className=" w-full items-center justify-between flex pr-5">
           <h1 className=" text-xl font-semibold ">Variants</h1> 
           <button onClick = {(e) => setOpen(true)} className={`${selectedVariantEdit.length > 0 ? ' opacity-100' : ' opacity-0'}`}><CiEdit/></button>
          
         </div>

         <div className=" w-full flex flex-col gap-2">
          <RecursiveVariantTree variants={productData.variants}
          productData={productData} setProductData={setProductData}
          selectedVariantEdit = {selectedVariantEdit} setSelectedVariantEdit = {setSelectedVariantEdit}  />
         </div>

         <Modal
          title={<h1 className=" text-2xl">Edit Variants</h1>}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
         >
           <div className=" w-full mt-10 grid gap-5 overflow-auto">

             <VariantEdit selectedVariantEdit={selectedVariantEdit} setSelectedVariantEdit={setSelectedVariantEdit}
             productData={productData} setProductData={setProductData}
             />
              
           </div>
         </Modal>

    </div>
  )
}

export default Variants