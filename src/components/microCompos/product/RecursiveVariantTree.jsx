import { useState } from "react";
import VariantMediasModal from "./VariantMediasModal";
import { CiEdit } from "react-icons/ci";

/* eslint-disable react/prop-types */
const RecursiveVariantTree = ({ variants, setProductData, productData, selectedVariantEdit, setSelectedVariantEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // ✅ Checkbox handler — only store variant objects
  const handleCheckboxChange = (groupKey, groupData, checked) => {
    setSelectedVariantEdit(prev => {
      if (checked) {
        // Collect all variant objects (no keys)
        const allVariants = collectAllVariants(groupData);

        // Add unique variants
        const updated = [...prev];
        allVariants.forEach(variant => {
          const exists = updated.some(
            v => JSON.stringify(v.options) === JSON.stringify(variant.options)
          );
          if (!exists) updated.push(variant);
        });
        return updated;
      } else {
        // Remove selected variants recursively
        const allVariantsToRemove = collectAllVariants(groupData);
        return prev.filter(
          v =>
            !allVariantsToRemove.some(
              rm => JSON.stringify(rm.options) === JSON.stringify(v.options)
            )
        );
      }
    });
  };

  // ✅ Recursively collect all variant objects
  const collectAllVariants = (group, level = 0) => {
    let result = [];
    const grouped = groupVariants(group, level);
    for (const [_, subgroup] of Object.entries(grouped)) {
      const isLeaf = subgroup[0].options.length === level + 1;
      if (isLeaf) {
        result = result.concat(subgroup);
      } else {
        result = result.concat(collectAllVariants(subgroup, level + 1));
      }
    }
    return result;
  };

  // ✅ Group by option level
  const groupVariants = (variantList, level = 0) => {
    const grouped = {};
    for (const variant of variantList) {
      const key = variant.options[level] || "N/A";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(variant);
    }
    return grouped;
  };

  // ✅ Recursive renderer
  const renderTree = (variantList, level = 0) => {
    const grouped = groupVariants(variantList, level);

    return Object.entries(grouped).map(([key, group], idx) => {
      const isLeaf = group[0].options.length === level + 1;
      const isChecked = group.some(variant =>
        selectedVariantEdit.some(
          v => JSON.stringify(v.options) === JSON.stringify(variant.options)
        )
      );

      return (
        <div key={`${key}-${level}-${idx}`} className="mb-2">
          {isLeaf ? (
            // 🌿 LEAF
            <div className="flex items-center ml-4 justify-between rounded-xl gap-2 bg-gray-100 p-3">
              <div className="flex items-center w-full gap-2">
                <input
                  type="checkbox"
                  className="checkbox rounded-full w-5 h-5"
                  checked={isChecked}
                  onChange={e => handleCheckboxChange(key, group, e.target.checked)}
                />
                <div
                  className="w-10 h-10 overflow-hidden rounded-md bg-[#ffddaeb9] cursor-pointer"
                  onClick={() => {
                    setSelectedVariant(group);
                    setIsModalOpen(true);
                  }}
                >
                  <img
                    src={group[0]?.variantMedias?.[0]?.url}
                    className="object-cover h-full w-full"
                    alt=""
                  />
                </div>
                <div className="w-full flex items-center px-3 justify-between">
                  <span>{key}</span>
                  <CiEdit />
                </div>
              </div>
            </div>
          ) : (
            // 🌳 PARENT
            <div className="collapse collapse-arrow bg-base-100 p-0 m-0">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">
                <div className="flex items-center justify-between rounded-xl gap-2 bg-gray-100 p-3">
                  <div className="flex items-center w-full gap-2 z-10">
                    <input
                      type="checkbox"
                      className="checkbox rounded-full w-5 h-5"
                      checked={isChecked}
                      onChange={e => handleCheckboxChange(key, group, e.target.checked)}
                    />
                    <div
                      className="w-10 h-10 overflow-hidden rounded-md bg-[#ffddaeb9] cursor-pointer"
                      onClick={() => {
                        setSelectedVariant(group);
                        setIsModalOpen(true);
                      }}
                    >
                      <img
                        src={group[0]?.variantMedias?.[0]?.url}
                        className="object-cover h-full w-full"
                        alt=""
                      />
                    </div>
                    <div className="w-full flex items-center px-3 justify-between">
                      <span>{key}</span>
                      <CiEdit />
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse-content text-sm flex flex-col gap-3">
                {renderTree(group, level + 1)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div>{renderTree(variants)}</div>
      <VariantMediasModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedGroup={selectedVariant}
        productData={productData}
        setProductData={setProductData}
      />
    </>
  );
};

export default RecursiveVariantTree;
