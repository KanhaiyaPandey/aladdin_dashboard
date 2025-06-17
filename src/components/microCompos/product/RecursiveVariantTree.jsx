const RecursiveVariantTree = ({ variants }) => {
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
                         <div className=" w-10 h-10 rounded-md bg-[#ffddaeb9]">
                            <img src="" alt="" />
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
                         <div className=" w-10 h-10 rounded-md bg-[#ffddaeb9]">
                            <img src="" alt="" />
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

  return <div>{renderTree(variants)}</div>;
};

export default RecursiveVariantTree;
