import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import AdminHeader from "../components/dashboardCompos/AdminHeader";
import { useState } from "react";
import { Input, Modal } from "antd";
import { SiTicktick } from "react-icons/si";
import toast from "react-hot-toast";
import { customFetch } from "../utils/Helpers";
import { IoMdAdd } from "react-icons/io";


const Warehouse = () => {
  const { warehouses } = useLoaderData();
  const [open, setOpen] = useState(false);
  const revalidator = useRevalidator(); 
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [warehouse, setWarehouse] = useState({
    name: "",
    address: "",
    pincode: "",
  });


  const handleCreateWarehouse = async () => {
    setConfirmLoading(true);
    try {
      const response = await customFetch.post(
        "/warehouse/create-warehouse",
        warehouse
      );
      toast.success(response.data.message);
      revalidator.revalidate();
      setOpen(false);
      // Refresh the list of warehouses or update state accordingly
    } catch (error) {
      toast.error(error?.response?.data?.details || "Something went wrong");
    }finally{
      setConfirmLoading(false);
      setOpen(false);
      setWarehouse({ name: "", address: "", pincode: ""})
    }
  }

  const handleCancel = () => {
    setOpen(false);
    setWarehouse({ name: "", address: "", pincode: ""})
  }



  if (
    warehouses.length === 0 ||
    warehouses === undefined ||
    warehouses === null
  ) {
    return (
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
        <img src="/nothing.svg" alt="" className="w-full h-44" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-3xl">
            Create categories to organize your products
          </h1>
          <p className="mt-4 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Organize your products with categories to help customers easily find
            what they need.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <button
              onClick={() => setOpen(true)}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Warehouse
            </button>
            <Link
              to="/overview"
              className="text-sm font-semibold text-gray-900"
            >
              Go back <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <Modal
          title={<h1 className=" text-2xl">Create Warehouse</h1>}
          centered
          open={open}
          onOk={() => handleCreateWarehouse()}
          onCancel={() => handleCancel()}
          confirmLoading={confirmLoading}
          width={1000}
        >
          <div className=" w-full mt-10 grid gap-5">
            <div className=" flex flex-col gap-2">
              <h1 className=" text-lg">Name</h1>
              <Input
                placeholder="Warehouse Name"
                value={warehouse.name}
                onChange={(e) =>
                  setWarehouse({ ...warehouse, name: e.target.value })
                }
              />
            </div>

            <div className=" flex flex-col gap-2">
              <h1 className=" text-lg">Address</h1>
              <Input
                placeholder="Warehouse Address"
                value={warehouse.address}
                onChange={(e) =>
                  setWarehouse({ ...warehouse, address: e.target.value })
                }
              />
            </div>

            <div className=" flex items-center justify-between gap-2">
              <div className=" w-1/2 flex flex-col gap-2">
                <h1 className=" text-lg">Pincode</h1>
                <Input
                  placeholder="Area Pincode"
                  value={warehouse.pincode}
                  prefix={<h1 className=" p-1"><SiTicktick color="#22c55e"/></h1>}
                  onChange={(e) =>
                    setWarehouse({ ...warehouse, pincode: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <main className="flex flex-col flex-1 m-4 lato text-slate-900 px-4 gap-8">
      <AdminHeader />
      <h2 className="font-bold mx-4 text-pretty text-2xl">Warehouses</h2>

      <div className=" flex items-center p-2 justify-between w-full">
        <div className=" w-1/2"></div>
        <button onClick={() => setOpen(true)} className=" btn"><IoMdAdd/> Add Warehouse</button>
      </div>

      <div className=" p-2 ">

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th><input type="checkbox" className=" checkbox" name="" id="" /></th>
                <th>Name</th>
                <th>Address</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {warehouses.map((warehouse) => (
                <tr key={warehouse.warehouseId}>
                  <th><input type="checkbox" className=" checkbox" name="" id="" /></th>
                  <td>{warehouse.name}</td>
                  <td>{warehouse.address}</td>
                  <td>{warehouse.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

        <Modal
          title={<h1 className=" text-2xl">Create Warehouse</h1>}
          centered
          open={open}
          onOk={() => handleCreateWarehouse()}
          onCancel={() => handleCancel()}
          confirmLoading={confirmLoading}
          width={1000}
        >
          <div className=" w-full mt-10 grid gap-5">
            <div className=" flex flex-col gap-2">
              <h1 className=" text-lg">Name</h1>
              <Input
                placeholder="Warehouse Name"
                value={warehouse.name}
                onChange={(e) =>
                  setWarehouse({ ...warehouse, name: e.target.value })
                }
              />
            </div>

            <div className=" flex flex-col gap-2">
              <h1 className=" text-lg">Address</h1>
              <Input
                placeholder="Warehouse Address"
                value={warehouse.address}
                onChange={(e) =>
                  setWarehouse({ ...warehouse, address: e.target.value })
                }
              />
            </div>

            <div className=" flex items-center justify-between gap-2">
              <div className=" w-1/2 flex flex-col gap-2">
                <h1 className=" text-lg">Pincode</h1>
                <Input
                  placeholder="Area Pincode"
                  value={warehouse.pincode}
                  prefix={<h1 className=" p-1"><SiTicktick color="#22c55e"/></h1>}
                  onChange={(e) =>
                    setWarehouse({ ...warehouse, pincode: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </Modal>
    </main>
  );
};

export default Warehouse;
