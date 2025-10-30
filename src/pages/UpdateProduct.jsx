/* eslint-disable no-unused-vars */
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import Pricing from "../components/productCompos/Pricing";
import Inventory from "../components/productCompos/Inventory";
import MediaUpload from "../components/productCompos/MediaUpload";
import CategorySelection from "../components/productCompos/CategorySelection";
import NavigationHead from "../components/productCompos/NavigationHead";
import { customFetch, publicFetch } from "../utils/Helpers";
import Attributes from "../components/productCompos/Attributes";
import Variants from "../components/productCompos/Variants";
import OtherDetails from "../components/productCompos/OtherDetails";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product } = useLoaderData();

  const [productData, setProductData] = useState(product);

  useEffect(() => {    
    const fetchData = async () => {
      try {
        const response = await publicFetch(
          `/product/${id}`
        );     
        setProductData(response?.data?.data);
      } catch (err) {
        toast.error("Failed to load product data");
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleUpdateProduct = async () => {
    try {
     const response = await customFetch.put(`/product/update-product/${id}`, productData)
      toast.success(response.data.message);
      navigate(`/products/update-product/${id}`);
    } catch (error) {
      toast.error(error.message || "Failed to update the product.");
    }
  };

  

  return (
     <main className=" h-full flex flex-col items-center justify-center">
      <NavigationHead handleSaveProduct={handleUpdateProduct} activePage={"update product"} />
      <div className=" p-7 w-full mx-auto lato grid grid-cols-2 gap-x-6 items-start">
        {/* Left side */}
        <div className="w-full grid grid-cols-1 gap-y-6">
          <div className="w-full flex flex-col gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
            <h1 className="text-xl">General Information</h1>
            <div className="w-full">
              <p className="text-gray-500">Product Name</p>
              <Input
                placeholder=""
                onChange={(e) =>
                  setProductData({ ...productData, title: e.target.value })
                }
                value={productData.title}
                variant="filled"
                className="mt-2 h-12"
              />
            </div>
            <div className="w-full">
              <p className="text-gray-500">Description</p>
              <TextArea
                placeholder=""
                className="p-2 mt-2"
                variant="filled"
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
                value={productData.description}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </div>
          </div>

          <Pricing productData={productData} setProductData={setProductData} />

          <Inventory productData={productData} setProductData={setProductData} />
        </div>

        {/* Right side */}
        <div className="w-full flex flex-col gap-y-6">
          <MediaUpload
            productData={productData}
            setProductData={setProductData}
          />
          <Attributes productData={productData} setProductData={setProductData}/>
       {productData.variants.length > 0 && <Variants productData={productData} setProductData={setProductData}/>}
          <CategorySelection
            productData={productData}
            setProductData={setProductData}
          />
          <OtherDetails productData={productData} setProductData={setProductData}/>
        </div>
      </div>
    </main>
  );
};

export default UpdateProduct;
