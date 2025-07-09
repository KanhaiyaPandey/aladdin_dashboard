/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

const AllProductTable = ({products, handleDelete}) => {
  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Categories</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}

{products.map((item, index) => (

    <tr key={item.productId}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className=" rounded-xl h-12 w-12">
                <img
                  src={ item?.productMedias.length > 0 ? item?.productMedias[0]?.url : "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                  alt="image media" className=" object-contain" />
              </div>
            </div>
            <div>
              <div className="font-bold">{item.title}</div>
            </div>
          </div>
        </td>
        <td className=" flex items-center gap-1">
            {item?.productCategories?.length > 0 ? (
            <span>
              {item.productCategories.map(category => category.title).join(', ')}
            </span>
          ) : (
            <span>none</span>
          )}
        
  
        </td>
        <td>{new Date(item.createdAt).toLocaleString()}</td>
        <th className=" flex items-center justify-start">
          <button className="btn btn-ghost btn-circle btn-md"><EyeOutlined /></button>
          <Link to={`/products/update-product/${item.productId}`} className="btn btn-ghost btn-circle btn-md"><EditOutlined /></Link>
          <button onClick={() => handleDelete(item.productId, item.title)} className="btn btn-ghost btn-circle btn-md"><DeleteOutlined /></button>
        </th>
      </tr>

))}



    </tbody>
  </table>
</div>
  )
}

export default AllProductTable