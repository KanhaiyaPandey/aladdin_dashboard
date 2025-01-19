import { Input } from "antd";

const Pricing = () => {
  return (
    <div className=" w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className=" text-xl ">Pricing</h1>

      <div className=" w-full flex gap-3 items-center justify-center ">
        <div className=" w-1/2 flex flex-col gap-2">
          <p className="text-gray-500">Sell Price</p>
          <Input prefix="₹" className=" h-12" variant="filled" />
        </div>

        <div className=" w-1/2 flex flex-col gap-2">
          <p className="text-gray-500">Compare At</p>
          <Input prefix="₹" className=" h-12" variant="filled" />
        </div>
      </div>

      <div className=" w-full flex gap-3 items-center justify-center ">
        <div className=" w-1/2 flex flex-col gap-2">
          <p className="text-gray-500">Cost Price</p>
          <Input prefix="₹" className=" h-12" variant="filled" />
        </div>

        <div className=" w-1/2 flex flex-col gap-2">
          <p className="text-gray-500">Profit</p>
          <Input prefix="₹" className=" h-12" variant="filled" disabled />
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
        <span className=" text-sm text-gray-500">Show discount in amout</span>
      </p>
    </div>
  );
};

export default Pricing;
