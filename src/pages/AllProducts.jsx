/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { showDeleteConfirmToast } from "../utils/showDeleteConfirmToast";
import AdminHeader from "../components/dashboardCompos/AdminHeader";
import AllProductTable from "../components/allProducts/AllProductTable";
import {
  Link,
  useLoaderData,
  useNavigation,
  useRevalidator,
} from "react-router-dom";
import { customFetch, publicFetch } from "../utils/Helpers";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const { products } = useLoaderData();
  const revalidator = useRevalidator();
  const navigation = useNavigation();
  useEffect(() => {
    if (navigation.state === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [navigation.state]);

  const handleDelete = (productId, title) => {
    "Trying to delete productId:", productId;
    showDeleteConfirmToast(async () => {
      try {
        const response = await customFetch(
          `/product/delete-product/${productId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        toast.success(`Product ${title} deleted successfully!`);
        revalidator.revalidate();
      } catch (error) {
        console.error("Delete error:", error.message);
        toast.error("Failed to delete product");
      }
    });
  };

  return (
    <main className="flex flex-col flex-1 m-4  lato text-slate-900 px-4 gap-8 ">
      <AdminHeader />

      {loading ? (
        <div className="w-full h-full flex items-center justify-center mt-20">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      ) : products.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <AllProductTable products={products} handleDelete={handleDelete} />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <img src="/nothing.svg" alt="" className="w-full h-72" />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
              No Product Found
            </h1>
            <p className="mt-4 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Sorry, You haven't added any product yet.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                to="/products/add-product"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Product
              </Link>
              <Link
                to="/overview"
                className="text-sm font-semibold text-gray-900"
              >
                Go back <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AllProducts;
