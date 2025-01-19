import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import Pricing from "../components/productCompos/Pricing";
import Inventory from "../components/productCompos/Inventory";
import MediaUpload from "../components/productCompos/MediaUpload";

const AddProduct = () => {
  return (
    <div className=" bg-white p-7 lato grid grid-cols-2 gap-x-6">
      {/* add product left side */}
      <div className=" w-full grid grid-cols-1 gap-y-6">
        <div className=" w-full flex flex-col gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
          <h1 className=" text-xl">General Information</h1>
          <div className="w-full">
            <p className="text-gray-500">Product Name</p>
            <Input placeholder="" variant="filled" className=" mt-2 h-12" />
          </div>
          <div className="w-full">
            <p className="text-gray-500">Description</p>
            <TextArea
              placeholder=""
              className=" p-2 mt-2"
              variant="filled"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </div>
        </div>

        <Pricing />

        <Inventory />
      </div>

      {/* add product right side */}

      <div className=" w-full grid grid-cols-1 gap-y-6">
        <MediaUpload/>
      </div>


    </div>
  );
};

export default AddProduct;
