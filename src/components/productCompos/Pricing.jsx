/* eslint-disable react/prop-types */
import { Input } from "antd";

const Pricing = ({productData, setProductData}) => {
  return (
    <div className=" w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className=" text-xl font-semibold ">Pricing</h1>

      <div className=" w-full flex gap-3 items-center justify-center ">
        <div className=" w-1/2 flex flex-col gap-2">
          <p className="text-gray-500">Sell Price</p>
          <Input
           value={productData.sellPrice}
           onChange={(e) => {
            const value = e.target.value;
            setProductData({
              ...productData,
              sellPrice: value === "" ? "" : Math.max(0, parseFloat(value) || 0),
            });
          }}
           prefix="₹" className=" h-12" variant="filled" />
        </div>

        <div className=" w-1/2 flex flex-col gap-2">
          <p className="text-gray-500">Compare At</p>
          <Input
           value={productData.compareAtPrice}
          onChange={(e) => setProductData({
            
            ...productData,
            compareAtPrice: Math.max(0,e.target.value)
          })}
           prefix="₹" className=" h-12" variant="filled" />
        </div>
      </div>

      <div className=" w-full flex gap-3 items-center justify-center ">
        <div className=" w-1/2 flex flex-col gap-2">
          <p className="text-gray-500">Cost Price</p>
          <Input
          value={productData.costPrice}
          onChange={(e) => setProductData({
            ...productData,
            costPrice: Math.max(0,e.target.value)
          })}
           prefix="₹" className=" h-12" variant="filled" />
        </div>

        <div className=" w-1/2 flex flex-col gap-2">
          <p className="text-gray-500">Profit</p>
          <Input value={productData.sellPrice - productData.costPrice} prefix="₹" className=" h-12" variant="filled" disabled />
        </div>
      </div>

      <p className=" flex gap-3 items-center mt-3">
        <input
          type="radio"
          name="radio-1"
          className="radio w-4 h-4"
          defaultChecked
        />
        <span className=" text-sm text-gray-500">
          Show discount in percentage
        </span>
      </p>

      <p className=" flex gap-3 items-center">
        <input type="radio" name="radio-1" className="radio w-4 h-4" />
        <span className=" text-sm text-gray-500">Show discount in amount</span>
      </p>
    </div>
  );
};

export default Pricing;
