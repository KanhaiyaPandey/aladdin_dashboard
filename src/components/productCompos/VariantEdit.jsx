/* eslint-disable react/prop-types */

import { Input } from "antd";

const VariantEdit = ({
  selectedVariantEdit,
  productData,
  setProductData,
  setSelectedVariantEdit,
}) => {
  const handleInputChange = (variantOptions, field, value) => {
    let updatedVariant = null;

    // ✅ Step 1: Update selectedVariantEdit and capture the changed variant
    const updatedSelectedVariants = selectedVariantEdit.map((variant) => {
      const isMatch = variant.options.every(
        (opt, i) => opt === variantOptions[i]
      );
      if (isMatch) {
        updatedVariant = { ...variant, [field]: value };
        return updatedVariant;
      }
      return variant;
    });

    setSelectedVariantEdit(updatedSelectedVariants);

    // ✅ Step 2: If productData.variants exists, update directly using updatedVariant
    if (updatedVariant && productData.variants) {
      const updatedProductVariants = productData.variants.map((variant) => {
        const isMatch = variant.options.every(
          (opt, i) => opt === updatedVariant.options[i]
        );
        return isMatch ? updatedVariant : variant;
      });

      setProductData({ ...productData, variants: updatedProductVariants });
    }
  };

  // --- NEW: handle warehouse stock change for a variant (clamped to product warehouse max) ---
  const handleWarehouseStockChange = (
    variantOptions,
    warehouseIndex,
    value
  ) => {
    let updatedVariant = null;

    // normalize numeric input (allow empty string to clear)
    const parsed = value === "" ? "" : Number(value);
    const updatedSelected = selectedVariantEdit.map((variant) => {
      const isMatch = variant.options.every(
        (opt, i) => opt === variantOptions[i]
      );
      if (!isMatch) return variant;

      // try to find the warehouse id on the variant entry
      const wEntry = variant.variantWarehouseData?.[warehouseIndex] || {};
      const warehouseId = wEntry?.warehouseId ?? wEntry?.id ?? null;

      // find product warehouse to get max allowed stock
      const productWarehouse =
        productData?.warehouseData?.find(
          (w) =>
            w.id === warehouseId ||
            w._id === warehouseId ||
            String(w.id) === String(warehouseId)
        ) || {};

      // assume productWarehouse.stock or productWarehouse.maxStock or productWarehouse.quantity as limit
      const maxStock =
        productWarehouse.stock ??
        productWarehouse.maxStock ??
        productWarehouse.quantity ??
        Infinity;

      // compute final stock (empty string allowed). clamp between 0 and maxStock
      let finalStock;
      if (parsed === "") finalStock = "";
      else {
        const n = Number(parsed) || 0;
        finalStock = Math.min(Math.max(n, 0), Number(maxStock));
      }

      const newVariant = {
        ...variant,
        variantWarehouseData: variant.variantWarehouseData.map((w, idx) =>
          idx === warehouseIndex ? { ...w, stock: finalStock } : w
        ),
      };

      updatedVariant = newVariant;
      return newVariant;
    });

    setSelectedVariantEdit(updatedSelected);

    // update productData.variants to keep both states in sync
    if (updatedVariant && productData?.variants) {
      const updatedProductVariants = productData.variants.map((variant) => {
        const isMatch = variant.options.every(
          (opt, i) => opt === updatedVariant.options[i]
        );
        return isMatch ? updatedVariant : variant;
      });
      setProductData({ ...productData, variants: updatedProductVariants });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Variant</th>
            <th>Sell Price</th>
            <th>Compare At</th>
            <th>SKU</th>
            <th>Barcode</th>

            {productData.warehouseData.map((warehouse, index) => (
              <th className=" capitalize" key={index}>
                {warehouse.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedVariantEdit.map((variant, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td className=" min-w-36">
                {variant.options.map((option, index) => {
                  return (
                    <span key={index}>
                      {option}
                      {index !== variant.options.length - 1 ? " - " : ""}
                    </span>
                  );
                })}
              </td>
              <td className="min-w-24">
                <Input
                  value={variant.sellPrice || ""}
                  onChange={(e) =>
                    handleInputChange(
                      variant.options,
                      "sellPrice",
                      e.target.value
                    )
                  }
                />
              </td>
              <td className="min-w-24">
                <Input
                  value={variant.compareAtPrice || ""}
                  onChange={(e) =>
                    handleInputChange(
                      variant.options,
                      "compareAtPrice",
                      e.target.value
                    )
                  }
                />
              </td>
              <td className="min-w-24">
                <Input
                  value={variant.variantSku || ""}
                  onChange={(e) =>
                    handleInputChange(variant.options, "sku", e.target.value)
                  }
                />
              </td>
              <td className="min-w-24">
                <Input
                  value={variant.barcode || ""}
                  onChange={(e) =>
                    handleInputChange(
                      variant.options,
                      "barcode",
                      e.target.value
                    )
                  }
                />
              </td>
              {variant.variantWarehouseData.map((warehouse, wIndex) => (
                <td className=" capitalize" key={wIndex}>
                  <Input
                    value={warehouse.stock ?? ""}
                    onChange={(e) =>
                      handleWarehouseStockChange(
                        variant.options,
                        wIndex,
                        e.target.value
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VariantEdit;
