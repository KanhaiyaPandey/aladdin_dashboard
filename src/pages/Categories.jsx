/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../components/dashboardCompos/AdminHeader";
import { publicFetch } from "../utils/Helpers";
import { AnimatePresence, motion } from "framer-motion";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(categories[0]?.categoryId || null);

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

 

  const toggleAccordion = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };


  const renderCategories = (categoriesList, level = 0) => {
      return categoriesList.map((category, index) => {
        const isOpen = openIndex === category.categoryId;

        return (
          <div
            key={category.categoryId}
             onClick={() => toggleAccordion(category.categoryId)}
            className={`border rounded-xl p-4 cursor-pointer shadow-sm ${level > 0 ? 'ml-4 border-l-2' : ''}`}
          >
            {/* Accordion Header */}
            <div
             
              className="flex justify-between items-center "
            >
              <div className=" flex items-center gap-4">
              <img src={category?.banner[0]} className=" w-8 h-8 object-cover rounded-lg border" alt="category img" />
              <div className="text-lg font-semibold">{category.title}</div>
              </div>
              <div className="text-sm text-gray-500 font-bold">
                {category.categoryProducts?.length || 0} products
              </div>

                         {/* Action Buttons */}
            <div className=" flex items-center gap-4">
              <button className=""title="Edit"><EditOutlined /></button>
              <button className=" " title="Add sub-category"><PlusCircleOutlined /></button>
              <button className=" " title="Delete category"><DeleteOutlined /></button>
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
                  <div className="ml-2">
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Subcategories:</h4>
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
              to="/create-category"
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
