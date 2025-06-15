import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../components/dashboardCompos/AdminHeader";

const Collections = () => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // simulate 500ms loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col flex-1 m-4  lato text-slate-900 px-4 gap-8 ">
      <AdminHeader/>
    <h2 className="font-bold mx-4 text-pretty text-2xl">Collections</h2>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center mt-20">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <img src="/nothing.svg" alt="" className="w-full h-44" />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-3xl">
              No Collection Found!
            </h1>
            <p className="mt-4 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Use collections to organize your products into categories and galleries for your online store.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                to="/create-collection"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Collection
              </Link>
              <Link to="/overview" className="text-sm font-semibold text-gray-900">
                Go back <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Collections;
