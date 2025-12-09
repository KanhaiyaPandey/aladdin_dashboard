import { useLoaderData } from "react-router-dom"
import AdminHeader from "../components/dashboardCompos/AdminHeader";

const Order = () => {
  const {orders} = useLoaderData();
  return (
    <main className="flex flex-col flex-1 m-4 lato text-slate-900 px-4 gap-8">
        <AdminHeader />
        <h2 className="font-bold mx-4 text-pretty text-2xl">Orders</h2>

        <div className=" p-2 ">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th><input type="checkbox" className=" checkbox" name="" id="" /></th>
                  <th>Name & Number</th>
                  <th>Payment Status</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                  <th>Address</th>
                  <th>Items</th>
                   <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {orders.map((order, index) => (
                  <tr key={orders.ordersId}>
                    <td>{index+1}</td>
                    <td><input type="checkbox" className=" checkbox" name="" id="" /></td>
                     <td><p className=" flex text-xs flex-col gap-1">
                        <span>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</span>
                        <span>{order.shippingAddress?.phoneNumber}</span>
                      </p></td>
                    <td><span className={`${order.paymentStatus === 'PENDING' ? 'bg-yellow-300 text-yellow-700' : ' bg-green-300 text-green-900'} px-3 py-1 text-xs rounded-full`}>{order.paymentStatus}</span></td>
                    <td className=" capitalize text-xs">
                                  ₹
                          {order?.grandTotal.toLocaleString(
                            "en-IN",
                            { minimumFractionDigits: 2 }
                          )}
                    </td>
                    <td className=" capitalize text-xs">{order?.status}</td>
                    <td>
                      <p className=" text-xs flex flex-col">
                        <span>{order?.shippingAddress.houseNumber},</span>
                        <span>{order.shippingAddress?.area},</span>
                        <span>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</span>
                        <span>{order.shippingAddress?.email}</span>
                     
                      </p>
                    </td>
                      <td className=" flex flex-col gap-1 text-xs">
                        {order?.items?.map((item) =>(
                          <div key={item.variantId} className=" flex mb-2  flex-col gap-2">
                            <p className="">{item.title}</p>
                             <ul className="list-disc list-inside flex gap-x-2 flex-wrap items-center">
                                {item?.options?.map((option, index) =>(
                                  <li key={index}>{option}</li>
                                ))}
                                <li>Qty: {item?.quantity}</li>
                             </ul>
                          </div>
                        ))}
                    </td>
                    <td className="">
                      <div className=" flex flex-col gap-1">
                          <button className=" btn text-xs btn-neutral capitalize">update order to confirmed</button>
                          <button className=" btn text-xs  btn-outline capitalize">cancel order</button>            
                      </div>    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
    </main>
  )
}

export default Order