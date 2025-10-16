/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input } from "antd";
import { useEffect, useState } from "react";
import { customFetch } from "../../utils/Helpers";
import WarehoueModal from "../microCompos/product/WarehoueModal";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useLoaderData } from "react-router-dom";

const Inventory = ({productData, setProductData}) => {
   
  const [allWarehouse, setAllWarehouse] = useState([]);
  const [warehouseData, setWarehouseData] = useState(productData?.warehouseData || []);
  const [openModal, setOpenModal] = useState(false)
  const {warehouses} = useLoaderData()

  useEffect(() =>{
   setAllWarehouse(warehouses);
  },[warehouses, productData])


    useEffect(() => {
    setWarehouseData(productData?.warehouseData || []);
  }, [productData?.warehouseData]);

  const handleSaveWarehouses = (newWarehouses) => {
    setWarehouseData(prev => [...prev, ...newWarehouses]);
    setProductData(prev => ({
      ...prev,
      warehouseData: [...warehouseData, ...newWarehouses],
    }));
  };

    const handleStockChange = (index, value) => {
    const updatedWarehouses = [...warehouseData];
    updatedWarehouses[index].stock = Number(value);

    setWarehouseData(updatedWarehouses);

    // Also update the productData
    setProductData(prev => ({
      ...prev,
      warehouseData: updatedWarehouses,
    }));
  };



  return (
    <div className=" w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className=" text-xl font-semibold ">Inventory</h1>

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

      
       <div className=" w-full flex items-center justify-between mt-10">
        <span className=" font-semibold">Warehouses</span>
        <button onClick={() => setOpenModal(true)} className="  items-center gap-2 flex ">
          <span><PlusCircleOutlined /></span>
          <span>Add Warehouse</span>
        </button>
        <WarehoueModal
         allWarehouse={allWarehouse}
          openModal={openModal}
          setOpenModal={setOpenModal}
          warehouseData={warehouseData}
          setWarehouseData={handleSaveWarehouses} 
         />
       </div>



    { warehouseData.length > 0 &&  <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>SL No.</th>
            <th>Warehouse</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {warehouseData.map((warehouse, index) =>(

          <tr key={warehouse?.warehouseId || index}>
            <th>{index+1}</th>
            <td>{warehouse?.name}</td>
            <td> <Input value={warehouse?.stock} className=" h-12 " onChange={(e) => handleStockChange(index, e.target.value)} /></td>
          </tr>

          ))}
 
        </tbody>
      </table>
    </div>
  }


    </div>
  );
};

export default Inventory;
