/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import { Select } from "antd";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategories } from "../../assets/features/categorySlice";

const CategorySelection = ({ productData, setProductData }) => {
  const loaderData = useLoaderData() || {};
  const reduxCategories = useSelector(selectCategories);
  
  // Handle both 'categories' and 'loaderCategories' property names from different loaders
  // Fallback to Redux state if loader data is empty
  const fetchedCategories = Array.isArray(loaderData.categories) && loaderData.categories.length > 0
    ? loaderData.categories
    : Array.isArray(loaderData.loaderCategories) && loaderData.loaderCategories.length > 0
    ? loaderData.loaderCategories
    : Array.isArray(reduxCategories) && reduxCategories.length > 0
    ? reduxCategories
    : [];

  const [allCategories, setAllCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // flatten nested category tree into list with path
  const flattenCategories = (list = [], parentPath = []) => {
    const out = [];
    for (const node of list || []) {
      const title = node.title ?? node.name ?? "";
      const path = [...parentPath, title];
      out.push({
        categoryId: String(node.categoryId ?? node._id ?? node.id ?? ""),
        title,
        slug: node.slug ?? "",
        path,
      });
      if (Array.isArray(node.subCategories) && node.subCategories.length > 0) {
        out.push(...flattenCategories(node.subCategories, path));
      }
    }
    return out;
  };

  // keep flattened list & quick map
  const flatList = useMemo(
    () => flattenCategories(allCategories),
    [allCategories]
  );
  const flatMap = useMemo(() => {
    const m = new Map();
    for (const n of flatList) m.set(String(n.categoryId), n);
    return m;
  }, [flatList]);

  // build options from flattened list. show path in bracket for nested items.
  const optionsSource = useMemo(() => {
    return flatList.map((n) => {
      const pathStr = n.path.length > 1 ? n.path.join("-") : "";
      const label = pathStr ? `${n.title} (${pathStr})` : n.title;
      return {
        label,
        value: String(n.categoryId),
        key: String(n.categoryId),
        slug: n.slug,
      };
    });
  }, [flatList]);

  // set allCategories preferring fetched tree, fallback to productData.categories
  useEffect(() => {
    const source =
      fetchedCategories && fetchedCategories.length > 0
        ? fetchedCategories
        : Array.isArray(productData?.categories)
        ? productData.categories
        : [];

    // only update state when source actually differs to prevent re-renders
    const srcStr = JSON.stringify(source || []);
    const currentStr = JSON.stringify(allCategories || []);
    if (srcStr !== currentStr) {
      setAllCategories(source);
    }
    // Remove allCategories from deps to prevent infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedCategories, productData?.categories]);

  // normalize productData.productCategories to only { categoryId, slug } ONCE when update loads
  useEffect(() => {
    const prodCats = Array.isArray(productData?.productCategories)
      ? productData.productCategories
      : [];
    if (prodCats.length === 0) return;

    const needNormalize = prodCats.some(
      (pc) =>
        typeof pc === "object" &&
        Object.keys(pc).some((k) => !["categoryId", "slug"].includes(k))
    );
    if (!needNormalize) return;

    const normalized = prodCats.map((pc) => {
      const id = String(pc?.categoryId ?? pc?._id ?? pc?.id ?? pc);
      const node = flatMap.get(id);
      const slug = pc?.slug ?? node?.slug ?? "";
      return { categoryId: id, slug };
    });

    setProductData((prev) => ({ ...prev, productCategories: normalized }));
    // run when productData.productCategories first contains un-normalized objects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData?.productCategories, flatMap]);

  // initialize selectedItems from productData.productCategories (update case)
  useEffect(() => {
    const prodCats = Array.isArray(productData?.productCategories)
      ? productData.productCategories
      : [];

    // Only process if flatMap is ready and has data
    if (flatMap.size === 0 && prodCats.length > 0) return;

    const formatted = prodCats.map((c) => {
      const id = String(c.categoryId ?? c);
      const node = flatMap.get(id);
      const pathStr = node?.path?.length > 1 ? node.path.join("-") : "";
      const label = pathStr
        ? `${node?.title ?? id} (${pathStr})`
        : node?.title ?? id;
      return { label, value: id, key: id, slug: c.slug ?? node?.slug ?? "" };
    });

    // avoid unnecessary set to prevent render loop
    const formattedStr = JSON.stringify(formatted);
    const currentStr = JSON.stringify(selectedItems);
    if (formattedStr !== currentStr) {
      setSelectedItems(formatted);
    }
    // depend on productData.productCategories and flatMap
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData?.productCategories, flatMap]);

  // handle change: send only id and slug in payload
  const handleCategoryChange = (values = []) => {
    setSelectedItems(values);

    const updated = values.map((v) => {
      const id = String(v.value ?? v.key);
      const node = flatMap.get(id);
      return { categoryId: id, slug: node?.slug ?? "" };
    });

    setProductData((prev) => ({ ...prev, productCategories: updated }));
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
          labelInValue
          value={selectedItems}
          onChange={handleCategoryChange}
          options={optionsSource}
          optionFilterProp="label"
          showSearch
        />
      </div>
    </div>
  );
};

export default CategorySelection;
