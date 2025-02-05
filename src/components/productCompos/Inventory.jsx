/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input } from "antd";

const Inventory = ({productData, setProductData}) => {
  return (
    <div className=" w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className=" text-xl ">Inventory</h1>

      <div className=" grid grid-cols-2 gap-3">
        <div className=" w-full flex flex-col gap-2">
          <p className="text-gray-500">SKU</p>
          <Input onChange={(e) => setProductData({
            ...productData,
            sku:e.target.value
          })}
          value={productData.sku}
           type="text" className=" h-12" variant="filled" />
        </div>

        <div className=" w-full flex flex-col gap-2">
          <p className="text-gray-500">Barcode</p>
          <Input
          onChange={(e) => setProductData({
            ...productData,
            barcode:e.target.value
          })}
          value={productData.barcode}
           type="text" className=" h-12" variant="filled" />
        </div>
      </div>

      <p className=" flex gap-3 items-center mt-3">
      <input type="checkbox"  className="checkbox w-4 h-4" />
        <span className=" text-sm text-gray-500">
          Track stock for this product
        </span>
      </p>


<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Warehouse</th>
        <th>Stock</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td> <Input className=" h-12 "  /></td>

      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td><Input className=" h-12 "  /></td>

      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td><Input className=" h-12 "  /></td>
      </tr>
    </tbody>
  </table>
</div>


    </div>
  );
};

export default Inventory;
