/* eslint-disable no-unused-vars */
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Pricing from "../components/productCompos/Pricing";
import Inventory from "../components/productCompos/Inventory";
import MediaUpload from "../components/productCompos/MediaUpload";
import CategorySelection from "../components/productCompos/CategorySelection";
import NavigationHead from "../components/productCompos/NavigationHead";
import { customFetch } from "../utils/Helpers";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    costPrice: "",
    sellPrice: "",
    compareAtPrice: "",
    sku: "",
    barcode: "",
    allowBackorder: true,
    stockStatus: "IN_STOCK",
    attributes: [],
    productCategories: [],
    productMedias: [],
    variants: [],
    warehouseData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/public/product/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const result = await response.json();
        setProductData(result);
      } catch (err) {
        toast.error("Failed to load product data");
      }
    };

    if (productId) fetchData();
  }, [productId]);

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("product", JSON.stringify(productData));

      const response = await customFetch.put(
        `/update-product/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      navigate("/all-product");
    } catch (error) {
      toast.error(error.message || "Failed to update the product.");
    }
  };

  return (
    <>
      <NavigationHead handleSaveProduct={handleUpdateProduct} />
      <div className="bg-white p-7 w-4/5 mx-auto lato grid grid-cols-2 gap-x-6">
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
          <CategorySelection
            productData={productData}
            setProductData={setProductData}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
