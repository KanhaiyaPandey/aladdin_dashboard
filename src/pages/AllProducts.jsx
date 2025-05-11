import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { RiAddCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { showDeleteConfirmToast } from "../utils/showDeleteConfirmToast";
import { customFetch } from "../utils/Helpers";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/public/product/all-products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log("response123: ", result.data);
        setProducts(result.data);
      } catch (err) {
        toast.error("Failed to fetch products");
      }
    };

    fetchData();
  }, []);

  const handleDelete = (productId) => {
    console.log("Trying to delete productId:", productId);
    showDeleteConfirmToast(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/public/product/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete product");
        }

        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.productId !== productId)
        );
        console.log(`Product ${productId} deleted successfully`);

        // Show a success toast
        toast.success(`Product ${productId} deleted successfully!`);
      } catch (error) {
        console.error("Delete error:", error.message);
        toast.error("Failed to delete product");
      }
    });
  };

  return (
    <div className="w-full h-screen overflow-x-hidden p-7 bg-slate-100">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold flex flex-col items-center justify-center text-gray-800">
          All Products
        </h2>
        <Link to="/add-product">
          <button>
            <RiAddCircleLine className="w-7 h-7" />
          </button>
        </Link>
      </header>

      <div className="w-full overflow-x-auto">
        <table className="w-4/5 mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-500/40">
            <tr className="h-[5rem]">
              <th className="text-left py-3 px-4 font-bold text-gray-700 border-b">
                Title
              </th>
              <th className="text-left py-3 px-4 font-bold text-gray-700 border-b">
                Image
              </th>
              <th className="text-left py-3 px-4 font-bold text-gray-700 border-b">
                Description
              </th>
              <th className="text-left py-3 px-4 font-bold text-gray-700 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {[...products].reverse().map((product) => (
              <tr
                key={product.productId}
                className="group bg-slate-200/70 hover:bg-gray-300/80"
              >
                <td className="py-3 px-4 border-b font-medium text-gray-800">
                  {product?.title}
                </td>

                <td className="py-3 px-4 border-b">
                  <div className="w-20 h-20 overflow-hidden flex items-center justify-center">
                    <img
                      src={product?.productMedias[0]?.url}
                      alt={product?.title}
                      className="object-contain h-full"
                    />
                  </div>
                </td>

                <td className="py-3 px-4 border-b text-gray-600">
                  {product?.description}
                </td>

                <td className="py-3 px-4 border-b">
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-in-out">
                    <Link to={`/update-product/${product.productId}`}>
                      <FaEdit className="h-5 w-5 cursor-pointer" />
                    </Link>
                    <button onClick={() => handleDelete(product.productId)}>
                      <MdDeleteForever className="h-5 w-5 cursor-pointer" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
