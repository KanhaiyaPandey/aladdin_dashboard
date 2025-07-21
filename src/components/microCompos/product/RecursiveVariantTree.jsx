import { useState } from "react";
import VariantMediasModal from "./VariantMediasModal";

/* eslint-disable react/prop-types */
const RecursiveVariantTree = ({ variants, setProductData, productData }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Grouping function for a given level 
  const groupVariants = (variantList, level = 0) => {
    const grouped = {};
    for (const variant of variantList) {
      const key = variant.options[level] || "N/A";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(variant);
    }
    return grouped;
  };

  // Recursive tree builder
  const renderTree = (variantList, level = 0) => {
    const grouped = groupVariants(variantList, level);

    return Object.entries(grouped).map(([key, group], idx) => {
      const isLeaf = group[0].options.length === level + 1;

      return (
        <div key={`${key}-${level}-${idx}`} className="mb-2">
          {isLeaf ? (
            <div className="flex items-center ml-4 justify-between rounded-xl gap-2 bg-gray-100 p-3">
                    <div className=" flex items-center gap-2">
                        <input type="checkbox" />
                         <div className=" w-10 h-10 overflow-hidden rounded-md bg-[#ffddaeb9] cursor-pointer"
                           onClick={() => {
                            setSelectedVariant(group);
                            setIsModalOpen(true);
                          }}>
                            <img src={group[0]?.variantMedias?.[0]?.url} className=" object-cover h-full w-full" alt="" />
                         </div>
                        <span>{key}</span>
                    </div>
            </div>
          ) : (
            <div className="collapse collapse-arrow  bg-base-100 p-0 m-0">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">
                <div className="flex items-center justify-between rounded-xl gap-2 bg-gray-100 p-3 ">
                    <div className=" flex items-center gap-2 z-10">
                        <input type="checkbox" />
                         <div className=" w-10 h-10 overflow-hidden rounded-md bg-[#ffddaeb9]"
                            onClick={() => {
                            setSelectedVariant(group);
                            setIsModalOpen(true);
                          }}>
                            <img src={group[0]?.variantMedias?.[0]?.url} className=" object-cover h-full w-full" alt="" />
                         </div>
                        <span>{key}</span>
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
     <VariantMediasModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
      selectedGroup={selectedVariant} productData={productData}
      setProductData={setProductData}/>
    </>
 
);
};

export default RecursiveVariantTree;
