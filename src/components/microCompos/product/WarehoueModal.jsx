/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useState, useEffect } from "react";

const WarehoueModal = ({
  allWarehouse = [],
  openModal,
  setOpenModal,
  warehouseData = [],
  setWarehouseData,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    // initialize selected checkboxes when modal opens or warehouseData changes (update page)
    const initIds = Array.isArray(warehouseData)
      ? warehouseData.map((w) => w.warehouseId)
      : [];
    setSelectedIds(initIds);
  }, [openModal, warehouseData]);

  const handleCheckboxChange = (warehouseId) => {
    setSelectedIds((prev) =>
      prev.includes(warehouseId)
        ? prev.filter((id) => id !== warehouseId)
        : [...prev, warehouseId]
    );
  };

  const handleSave = () => {
    const selectedWarehouses = (Array.isArray(allWarehouse) ? allWarehouse : [])
      .filter((wh) => selectedIds.includes(wh.warehouseId))
      .map((wh) => ({
        warehouseId: wh.warehouseId,
        name: wh.name,
        address: wh.address,
        pincode: wh.pincode,
        stock: 0,
      }));

    setWarehouseData(selectedWarehouses);
    setOpenModal(false);
  };

  const allWarehouseSafe = Array.isArray(allWarehouse) ? allWarehouse : [];

  return (
    <Modal
      title="Choose Warehouses To Add"
      centered
      open={openModal}
      onOk={() => handleSave()}
      onCancel={() => setOpenModal(false)}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
    >
      <div className="overflow-x-auto my-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className=" checkbox w-4 h-4"
                  checked={
                    allWarehouseSafe.length > 0 &&
                    selectedIds.length === allWarehouseSafe.length
                  }
                  onChange={(e) => {
                    if (e.target.checked)
                      setSelectedIds(
                        allWarehouseSafe.map((w) => w.warehouseId)
                      );
                    else setSelectedIds([]);
                  }}
                />
              </th>
              <th>Name</th>
              <th>Address</th>
              <th>Pincode</th>
            </tr>
          </thead>
          <tbody>
            {allWarehouseSafe.map((warehouse) => (
              <tr key={warehouse?.warehouseId}>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(warehouse?.warehouseId)}
                    onChange={() =>
                      handleCheckboxChange(warehouse?.warehouseId)
                    }
                    className=" checkbox w-4 h-4"
                  />
                </th>
                <td>{warehouse?.name}</td>
                <td>{warehouse?.address}</td>
                <td>{warehouse?.pincode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default WarehoueModal;
