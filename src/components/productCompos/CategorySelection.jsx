/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Select } from "antd";
import { publicFetch } from "../../utils/Helpers";


const CategorySelection = ({ productData, setProductData }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicFetch.get("/category/all-categories");
        if (response?.data?.success) {
          setCategories(response?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Set initial selected categories from productData
  useEffect(() => {
    if (productData?.productCategories?.length && categories.length) {
      const formattedSelected = productData.productCategories.map((cat) => {
        const match = categories.find((c) => c.categoryId === cat.categoryId);
        return {
          key: cat.categoryId,
          value: cat.categoryId,
          label: cat.title,
          title: cat.title,
        };
      });
      setSelectedItems(formattedSelected);
    }
  }, [productData, categories]);

  // Handle selection changes
  const handleCategoryChange = (values) => {
    setSelectedItems(values);

    const updatedCategories = values.map((cat) => ({
      categoryId: cat.key,
      title: cat.title,
    }));

    setProductData((prev) => ({
      ...prev,
      productCategories: updatedCategories,
    }));
  };

  return (
    <div className="w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className="text-xl">Category</h1>

      <div className="w-full">
        <p className="text-gray-500">Product Categories</p>
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          className="mt-2 h-12 w-full"
          variant="filled"
          value={selectedItems}
          labelInValue
          onChange={handleCategoryChange}
          options={categories.map((cat) => ({
            label: cat.title,
            value: cat.categoryId,
            key: cat.categoryId,
            title: cat.title,
          }))}
        />
      </div>
    </div>
  );
};

export default CategorySelection;
