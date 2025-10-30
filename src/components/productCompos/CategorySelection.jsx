/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Select } from "antd";
import { useLoaderData } from "react-router-dom";

const CategorySelection = ({ productData, setProductData }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [visibleOptions, setVisibleOptions] = useState([]);

  // guard loader data so `categories` is always an array
  const loaderData = useLoaderData() || {};
  const categories = Array.isArray(loaderData.categories)
    ? loaderData.categories
    : [];

  // update only when fetched categories or product's productCategories change
  useEffect(() => {
    const sourceCategories =
      Array.isArray(categories) && categories.length > 0
        ? categories
        : Array.isArray(productData?.categories)
        ? productData.categories
        : [];

    setAllCategories(sourceCategories);

    const initialSelected = Array.isArray(productData?.productCategories)
      ? productData.productCategories
      : [];

    if (initialSelected.length > 0) {
      const formatted = initialSelected.map((cat) => ({
        key: cat.categoryId,
        value: cat.categoryId,
        label: cat.title,
        title: cat.title,
        slug: cat.slug,
      }));

      // avoid unnecessary state updates (prevents infinite render loop)
      if (JSON.stringify(formatted) !== JSON.stringify(selectedItems)) {
        setSelectedItems(formatted);
      }

      const lastSelectedId =
        initialSelected[initialSelected.length - 1].categoryId;
      const lastSelectedNode = findCategoryNodeById(
        sourceCategories,
        lastSelectedId
      );

      const newVisible =
        lastSelectedNode?.subCategories?.length > 0
          ? lastSelectedNode.subCategories
          : [];

      if (JSON.stringify(newVisible) !== JSON.stringify(visibleOptions)) {
        setVisibleOptions(newVisible);
      }
    } else {
      const parentCategories = (sourceCategories || []).filter(
        (cat) => !cat.parentCategoryId
      );

      if (JSON.stringify(parentCategories) !== JSON.stringify(visibleOptions)) {
        setVisibleOptions(parentCategories);
      }

      if (selectedItems.length !== 0) {
        setSelectedItems([]);
      }
    }
    // only watch categories and productData.productCategories to avoid update depth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

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

    const last = values[values.length - 1];
    const lastNode = findCategoryNodeById(
      allCategories,
      last?.value || last?.key
    );

    if (lastNode?.subCategories?.length > 0) {
      setVisibleOptions(lastNode.subCategories);
    } else {
      setVisibleOptions([]);
    }
  };

  // Helper: Recursively search for a category by ID
  const findCategoryNodeById = (categoriesList = [], id) => {
    if (!Array.isArray(categoriesList) || !id) return null;

    for (const cat of categoriesList) {
      if (cat.categoryId === id) return cat;
      if (cat.subCategories?.length) {
        const found = findCategoryNodeById(cat.subCategories, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Build options
  const selectedIds = (productData?.productCategories || []).map(
    (c) => c.categoryId
  );
  const selectedOptions = (productData?.productCategories || []).map((c) => {
    const node = findCategoryNodeById(allCategories, c.categoryId);
    return {
      label: node?.title || c.title || c.slug || String(c.categoryId),
      value: c.categoryId,
      key: c.categoryId,
      title: node?.title || c.title,
      slug: node?.slug || c.slug,
    };
  });

  const remainingTopLevel = (allCategories || [])
    .filter((cat) => !selectedIds.includes(cat.categoryId))
    .filter((cat) => !cat.parentCategoryId)
    .map((cat) => ({
      label: cat.title,
      value: cat.categoryId,
      key: cat.categoryId,
      title: cat.title,
      slug: cat.slug,
    }));

  const optionsSource =
    selectedOptions.length > 0
      ? [...selectedOptions, ...remainingTopLevel]
      : visibleOptions && visibleOptions.length > 0
      ? visibleOptions
      : remainingTopLevel;

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
          options={optionsSource}
        />
      </div>
    </div>
  );
};

export default CategorySelection;
