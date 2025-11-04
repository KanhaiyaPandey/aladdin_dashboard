/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Select } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useLoaderData } from "react-router-dom";

const RelatedProducts = ({ productData, setProductData }) => {
  const allProducts = useLoaderData()?.allProducts || [];

  // helper to normalize an entry (could be id string or object)
  const normalizeId = (entry) =>
    typeof entry === "string"
      ? entry
      : entry?.productId ?? entry?.id ?? entry?._id ?? entry;

  // selected ids state (just productId strings)
  const [selectedUpsell, setSelectedUpsell] = useState(() => {
    const ids = Array.isArray(productData?.upSellProducts)
      ? productData.upSellProducts.map(normalizeId)
      : [];
    return ids.map(String);
  });
  const [selectedCrossSell, setSelectedCrossSell] = useState(() => {
    const ids = Array.isArray(productData?.crossSellProducts)
      ? productData.crossSellProducts.map(normalizeId)
      : [];
    return ids.map(String);
  });

  // build a map for quick lookup (index by multiple id keys)
  const productMap = useMemo(() => {
    const m = new Map();
    allProducts.forEach((p) => {
      const keys = [p.productId ?? null, p.id ?? null, p._id ?? null].filter(
        Boolean
      );
      keys.forEach((k) => m.set(String(k), p));
    });
    return m;
  }, [allProducts]);

  // helper to get title from productMap or fallback to productData arrays
  const resolveTitle = (id) => {
    const fromMap = productMap.get(String(id));
    if (fromMap) return fromMap.title ?? fromMap.name ?? "Unnamed";

    // fallback: look into productData.upSellProducts / crossSellProducts (may contain full object)
    const ups = Array.isArray(productData?.upSellProducts)
      ? productData.upSellProducts
      : [];
    const cross = Array.isArray(productData?.crossSellProducts)
      ? productData.crossSellProducts
      : [];
    const found =
      ups.concat(cross).find((p) => {
        const nid = normalizeId(p);
        return String(nid) === String(id);
      }) || null;
    if (found) return found.title ?? found.name ?? "Unnamed";
    return "Unknown";
  };

  // build options that always include currently selected items (for update page)
  const options = useMemo(() => {
    const selectedIdsSet = new Set([
      ...selectedUpsell.map(String),
      ...selectedCrossSell.map(String),
    ]);

    // start with selected items so they appear even if not in allProducts list
    const selectedOptions = Array.from(selectedIdsSet).map((id) => ({
      label: resolveTitle(id),
      value: String(id),
    }));

    // then add remaining products from allProducts
    const remaining = allProducts
      .filter(
        (p) => !selectedIdsSet.has(String(p.productId ?? p.id ?? p._id ?? ""))
      )
      .map((p) => ({
        label: p.title ?? p.name ?? "Unnamed",
        value: String(p.productId ?? p.id ?? p._id ?? ""),
      }));

    return [...selectedOptions, ...remaining];
    // resolveTitle uses productMap which depends on allProducts; include dependencies accordingly
  }, [allProducts, productMap, selectedUpsell, selectedCrossSell, productData]);

  // keep local selected state in sync when productData changes (update case)
  useEffect(() => {
    const ups = Array.isArray(productData?.upSellProducts)
      ? productData.upSellProducts.map(normalizeId).map(String)
      : [];
    const cross = Array.isArray(productData?.crossSellProducts)
      ? productData.crossSellProducts.map(normalizeId).map(String)
      : [];

    const eq = (a, b) =>
      a.length === b.length && a.every((v, i) => String(v) === String(b[i]));

    if (!eq(ups, selectedUpsell)) setSelectedUpsell(ups);
    if (!eq(cross, selectedCrossSell)) setSelectedCrossSell(cross);
  }, [productData?.upSellProducts, productData?.crossSellProducts]);

  const handleUpsellChange = (values) => {
    const ids = values.map(String);
    setSelectedUpsell(ids);
    setProductData((prev) => ({ ...prev, upSellProducts: ids }));
  };

  const handleCrossSellChange = (values) => {
    const ids = values.map(String);
    setSelectedCrossSell(ids);
    setProductData((prev) => ({ ...prev, crossSellProducts: ids }));
  };

  return (
    <div className="w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className="text-xl font-semibold">Related Products</h1>

      <div className="w-full flex flex-col gap-2">
        <p className="text-gray-500">Upsell Products</p>
        <Select
          className=" h-12 w-full"
          mode="multiple"
          options={options}
          value={selectedUpsell}
          placeholder="Select upsell products"
          onChange={handleUpsellChange}
          showSearch
          optionFilterProp="label"
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <p className="text-gray-500">Cross-sell Products</p>
        <Select
          className=" h-12 w-full"
          mode="multiple"
          options={options}
          value={selectedCrossSell}
          placeholder="Select cross-sell products"
          onChange={handleCrossSellChange}
          showSearch
          optionFilterProp="label"
        />
      </div>
    </div>
  );
};

export default RelatedProducts;
