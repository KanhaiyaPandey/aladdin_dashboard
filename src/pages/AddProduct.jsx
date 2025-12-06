import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import Pricing from "../components/productCompos/Pricing";
import Inventory from "../components/productCompos/Inventory";
import MediaUpload from "../components/productCompos/MediaUpload";
import CategorySelection from "../components/productCompos/CategorySelection";
import { useState } from "react";
import toast from "react-hot-toast";
import NavigationHead from "../components/productCompos/NavigationHead";
import Variants from "../components/productCompos/Variants";
import { useNavigate } from "react-router-dom";
import Attributes from "../components/productCompos/Attributes";
import OtherDetails from "../components/productCompos/OtherDetails";
import Dimensions from "../components/productCompos/Dimensions";
import RelatedProducts from "../components/microCompos/product/RelatedProducts";
import { useDispatch } from "react-redux";
import { createProduct, invalidateCache } from "../assets/features/productSlice";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    title: "",
    status: "ACTIVE",
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveProduct = async () => {
    // Basic validation
    if (!productData.title || !productData.title.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!productData.sellPrice || parseFloat(productData.sellPrice) <= 0) {
      toast.error("Valid sell price is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await dispatch(createProduct(productData)).unwrap();
      toast.success(result.message || "Product created successfully");
      dispatch(invalidateCache()); // Invalidate cache to force refresh
      navigate("/products");
    } catch (error) {
      toast.error(error || "Failed to save the product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSku = (name) => {
    if (!name) return "";
    return name.trim().toUpperCase().replace(/\s+/g, "-");
  };

  return (
    <main className=" flex flex-col items-center justify-center mb-10">
      <NavigationHead
        handleSaveProduct={handleSaveProduct}
        activePage={"add product"}
        isSubmitting={isSubmitting}
      />
      <div className=" mx-auto px-10 w-full lato grid grid-cols-2 gap-x-6 items-start">
        <div className=" w-full grid grid-cols-1 gap-y-6">
          <div className=" w-full flex flex-col gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
            <h1 className=" text-xl">General Information</h1>
            <div className="w-full">
              <p className="text-gray-500">Product Name</p>
              <Input
                placeholder=""
                onChange={(e) =>
                  setProductData((prev) => {
                    const title = e.target.value;
                    return {
                      ...prev,
                      title,
                      sku: generateSku(title),
                    };
                  })
                }
                value={productData.title}
                variant="filled"
                className=" mt-2 h-12"
              />
            </div>
            <div className="w-full">
              <p className="text-gray-500">Description</p>
              <TextArea
                placeholder=""
                className=" p-2 mt-2"
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

          <Inventory
            productData={productData}
            setProductData={setProductData}
          />

          <Dimensions
            productData={productData}
            setProductData={setProductData}
          />
        </div>

        {/* add product right side */}

        <div className=" w-full flex flex-col gap-y-6">
          <MediaUpload
            productData={productData}
            setProductData={setProductData}
          />
          <Attributes
            productData={productData}
            setProductData={setProductData}
          />
          {productData.variants.length > 0 && (
            <Variants
              productData={productData}
              setProductData={setProductData}
            />
          )}
          <CategorySelection
            productData={productData}
            setProductData={setProductData}
          />
          <RelatedProducts
            productData={productData}
            setProductData={setProductData}
          />
          <OtherDetails
            productData={productData}
            setProductData={setProductData}
          />
        </div>
      </div>
    </main>
  );
};

export default AddProduct;
