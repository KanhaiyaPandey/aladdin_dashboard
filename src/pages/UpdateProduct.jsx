/* eslint-disable no-unused-vars */
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Pricing from "../components/productCompos/Pricing";
import Inventory from "../components/productCompos/Inventory";
import MediaUpload from "../components/productCompos/MediaUpload";
import CategorySelection from "../components/productCompos/CategorySelection";
import NavigationHead from "../components/productCompos/NavigationHead";


const UpdateProduct = () => {

    const [productData, setProductData] = useState({
        title: "",
        description:"",
        costPrice:"",
        sellPrice:"",
        compareAtPrice:"",
        sku:"",
        barcode:"",
        allowBackorder:true,
        stockStatus:"IN_STOCK",
        attributes:[],
        productCategories:[],
        productMedias:[],
        variants:[],
        warehouseData:[],
    
      })

    



    useEffect(() =>{

        const fetchData = async () => {
            const productId = "6793abed64e45464c1f824bf"
            try {
              const response = await fetch(`http://localhost:8080/api/public/product/67a382c5c6c84b7b81a473b5`)
              if (!response.ok) {
                throw new Error("Failed to fetch data");
              }
              const result = await response.json();
              console.log("response123: ", result);
              setProductData(result);
            
            } catch (err) {
            //   setError(err.message);
            } finally {
            //   setLoading(false);
            }
          };
      
          fetchData();



    }, [])

  return (
    <>
    <NavigationHead/>
    <div className=" bg-white p-7 lato grid grid-cols-2 gap-x-6">
      {/* add product left side */}
      <div className=" w-full grid grid-cols-1 gap-y-6">
        <div className=" w-full flex flex-col gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
          <h1 className=" text-xl">General Information</h1>
          <div className="w-full">
            <p className="text-gray-500">Product Name</p>
            <Input placeholder="" 
              onChange={(e) => setProductData({
                ...productData,
                title: e.target.value
              })} 
              value={productData.title}
              variant="filled" className=" mt-2 h-12" />
          </div>
          <div className="w-full">
            <p className="text-gray-500">Description</p>
            <TextArea
              placeholder=""
              className=" p-2 mt-2"
              variant="filled"
              onChange={(e) => setProductData({
                ...productData,
                description : e.target.value
              })} 
              value={productData.description}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </div>
        </div>

        <Pricing productData={productData} setProductData={setProductData} />

        <Inventory productData={productData} setProductData={setProductData} />
      </div>

      {/* add product right side */}

      <div className=" w-full flex flex-col gap-y-6">
        <MediaUpload productData={productData} setProductData={setProductData}/>
        <CategorySelection productData={productData} setProductData={setProductData}/>
      </div>


    </div>
    </>
  )
}

export default UpdateProduct