/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../components/dashboardCompos/AdminHeader";
import { customFetch, publicFetch } from "../utils/Helpers";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDownOutlined, CaretRightOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined, RightOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(categories[0]?.categoryId || null);
    const [data, setData] = useState({categoryIds:["685e7921c33b294805137125"]});

  const navigate = useNavigate();


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () =>{
     try {
         const response = await publicFetch.get("/category/all-categories");
         setCategories(response.data.data);
         setLoading(false);    
     } catch (error) {
        console.log(error);
        
     }
  }

  
    const deleteCategories = async (id) => {
      try {
        const categoryIdsToDelete = id
          ? [id] // if single id passed
          : data.categoryIds; // else use state data

        const res = await customFetch.delete('/category/delete-categories', {
          data: { categoryIds: categoryIdsToDelete },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (categoryIdsToDelete.length > 1) {
          toast.success("Categories deleted");
        } else {
          toast.success("Category deleted");
        }
        await fetchCategories();
      } catch (err) {
        console.error("Error deleting categories:", err.response?.data || err.message);
        toast.error("Something went wrong. Try again later.");
      }
    };


 

    const [openMap, setOpenMap] = useState({});

    const toggleAccordion = (id) => {
      setOpenMap((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    const renderCategories = (categoriesList, level = 0) => {
      return categoriesList.map((category) => {
        const isOpen = openMap[category.categoryId];

        return (
          <div
            key={category.categoryId}
            className={`border rounded-xl p-4 w-full cursor-pointer shadow-sm ${level > 0 ? ' ml-2' : ''}`}
          >
            {/* Accordion Header */}
            <div onClick={() => toggleAccordion(category.categoryId)} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={category?.banner?.[0]} className="w-8 h-8 object-cover rounded-lg border" alt="category img" />
                <div className="text-lg font-semibold">{category.title}</div>
                { category.subCategories?.length > 0 && <span className={`${isOpen ? ' rotate-90' : ''} transition-all ease-in-out duration-300`}><CaretRightOutlined /></span>}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <Link to={`/categories/update-category/${category.categoryId}`} title="Update"><EditOutlined /></Link>
                <Link to={`/categories/create-subcategory/${category.categoryId}`} title="Add sub-category"><PlusCircleOutlined /></Link>
                <button onClick={() => deleteCategories(category.categoryId)} title="Delete category"><DeleteOutlined /></button>
              </div>
            </div>

            {/* Subcategory Accordion Content */}
            <AnimatePresence initial={false}>
              {isOpen && category.subCategories?.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3"
                >
                  <div className=" flex flex-col gap-2 w-full items-center">
                    {renderCategories(category.subCategories, level + 1)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      });
    };




return (
  <>
  <main className="flex flex-col flex-1 m-4 lato text-slate-900 px-4 gap-8">
    <AdminHeader />
    <h2 className="font-bold mx-4 text-pretty text-2xl">Categories</h2>

    {loading ? (
      // ✅ Loading Spinner
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    ) : categories.length === 0 ? (
      // ✅ No Categories
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
        <img src="/nothing.svg" alt="" className="w-full h-44" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-3xl">
            Create categories to organize your products
          </h1>
          <p className="mt-4 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Organize your products with categories to help customers easily find what they need.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              to="/categories/create-category"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Category
            </Link>
            <Link to="/overview" className="text-sm font-semibold text-gray-900">
              Go back <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      // ✅ Render Categories List
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center w-full justify-end">
          <button onClick={() => navigate("/categories/create-category")} className="btn btn-neutral">
            Add More
          </button>
        </div>
        {renderCategories(categories)}
      </div>
    )}
  </main>
  <Outlet/>
  </>
);

};

export default Categories;
