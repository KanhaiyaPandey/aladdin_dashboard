/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal } from "antd"
import { useState } from "react";

const WarehoueModal = ({allWarehouse,openModal,setOpenModal,warehouseData,setWarehouseData}) => {

  const [selectedIds, setSelectedIds] = useState([]);

    const handleCheckboxChange = (warehouseId) => {
    setSelectedIds(prev =>
      prev.includes(warehouseId)
        ? prev.filter(id => id !== warehouseId)
        : [...prev, warehouseId]
    );
  };

  const handleSave = () => {
    const selectedWarehouses = allWarehouse
      .filter(wh => selectedIds.includes(wh.warehouseId))
      .map(wh => ({
        name: wh.name,
        address: wh.address,
        pincode: wh.pincode,
        stock: 0,
      }));

    setWarehouseData(selectedWarehouses);
    setOpenModal(false);
  };


  
  return (
   <Modal
      title="Choose Warehouses To Add"
      centered
      open={openModal}
      onOk={() => handleSave()}
      onCancel={() => setOpenModal(false)}
      width={{
      xs: '90%',
      sm: '80%',
      md: '70%',
      lg: '60%',
      xl: '50%',
      xxl: '40%',
    }}
  >


    <div className="overflow-x-auto my-10">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th><input type="checkbox" className=" checkbox w-4 h-4" /></th>
        <th>Name</th>
        <th>Address</th>
        <th>Pincode</th>
      </tr>
    </thead>
    <tbody>
      {allWarehouse.map( warehouse =>(

      <tr key={warehouse?.warehouseId}>
        <th><input type="checkbox"
          checked={selectedIds.includes(warehouse?.warehouseId)}
          onChange={() => handleCheckboxChange(warehouse?.warehouseId)}
          className=" checkbox w-4 h-4" /></th>
        <td>{warehouse?.name}</td>
        <td>{warehouse?.address}</td>
        <td>{warehouse?.pincode}</td>
      </tr>
      ))}
    </tbody>
  </table>
</div>

  
    
   </Modal>
  )
}

export default WarehoueModal