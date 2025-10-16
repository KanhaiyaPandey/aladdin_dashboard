/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Select } from "antd";
import { publicFetch } from "../../utils/Helpers";
import { useLoaderData } from "react-router-dom";

const CategorySelection = ({ productData, setProductData }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [visibleOptions, setVisibleOptions] = useState([]);
  const {loaderCategories} = useLoaderData();

  

  // Fetch full category tree
  useEffect(() => {

          setAllCategories(loaderCategories);

          const initialSelected = productData?.productCategories || [];

          if (initialSelected.length > 0) {
            // Build selectedItems array
            const formatted = initialSelected.map((cat) => ({
              key: cat.categoryId,
              value: cat.categoryId,
              label: cat.title,
              title: cat.title,
              slug: cat.slug,
            }));
            setSelectedItems(formatted);

            // Determine the deepest selected category
            const lastSelectedId = initialSelected[initialSelected.length - 1].categoryId;
            const lastSelectedNode = findCategoryNodeById(loaderCategories, lastSelectedId);

            if (lastSelectedNode?.subCategories?.length > 0) {
              setVisibleOptions(lastSelectedNode.subCategories);
            } else {
              // No children, don't update visible options
              setVisibleOptions([]);
            }
          } else {
            // Nothing selected, show top-level parent categories
            const parentCategories = loaderCategories.filter(cat => !cat.parentCategoryId);
            setVisibleOptions(parentCategories);
          }

  }, [loaderCategories, productData]);

  // Handle selection change
  const handleCategoryChange = (values) => {
    setSelectedItems(values);

    const updatedCategories = values.map((cat) => {
      const matched = findCategoryNodeById(allCategories, cat.key || cat.value);
      return {
        categoryId: matched?.categoryId || cat.key || cat.value,
        slug: matched?.slug || cat.slug || cat.slug,
      };
    });

    setProductData((prev) => ({
      ...prev,
      productCategories: updatedCategories,
    }));

    // Show children of last selected
    const last = values[values.length - 1];
    const lastNode = findCategoryNodeById(allCategories, last.value);

    if (lastNode?.subCategories?.length > 0) {
      setVisibleOptions(lastNode.subCategories);
    } else {
      setVisibleOptions([]);
    }
  };

  // Helper: Recursively search for a category by ID
  const findCategoryNodeById = (categories, id) => {
    for (const cat of categories) {
      if (cat.categoryId === id) return cat;
      if (cat.subCategories?.length) {
        const found = findCategoryNodeById(cat.subCategories, id);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className="text-xl font-semibold">Category</h1>

      <div className="w-full">
        <p className="text-gray-500">Product Categories</p>
        <Select
          mode="multiple"
          placeholder="Select category"
          className="mt-2 h-12 w-full"
          variant="filled"
          value={selectedItems}
          labelInValue
          onChange={handleCategoryChange}
          options={visibleOptions.map((cat) => ({
            label: cat.title,
            value: cat.categoryId,
            key: cat.categoryId,
            title: cat.title,
            slug: cat.slug,
          }))}
        />
      </div>
    </div>
  );
};

export default CategorySelection;
