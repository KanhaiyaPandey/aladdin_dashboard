import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import Pricing from "../components/productCompos/Pricing";
import Inventory from "../components/productCompos/Inventory";
import MediaUpload from "../components/productCompos/MediaUpload";
import CategorySelection from "../components/productCompos/CategorySelection";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { customFetch } from "../utils/Helpers";
import NavigationHead from "../components/productCompos/NavigationHead";
import Variants from "../components/productCompos/Variants";
import { useNavigate } from "react-router-dom";



const AddProduct = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("add product");
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
   console.log("product data",productData);
   
  }, [productData])

  const handleSaveProduct = async () => {
    try {
   console.log(document.cookie);
      const formData = new FormData();
      formData.append("product", JSON.stringify(productData));
      const response = await customFetch.post('/create-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success(response.data.message);
      navigate("/all-product"); 
    } catch (error) {
      toast.error( error.response.data);
      // toast.error("Failed to save the product. Please try again.");
    }
  };
  

  return (
    <main className=" flex flex-col items-center justify-center">
    <NavigationHead handleSaveProduct={handleSaveProduct} activePage={"add product"}/>
    <div className="  mx-auto px-10  w-full lato grid grid-cols-2 gap-x-6 ">
      
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
        <Variants/>
      </div>


    </div>
    </main>
  );
};

export default AddProduct;
