/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Input, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import { generateCombinations } from "../../utils/Helpers";
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Attributes = ({ productData, setProductData }) => {
  const [attributeName, setAttributeName] = useState("");
  const [attributeValues, setAttributesValues] = useState([]);
  const [addedAttributes, setAddedAttributes] = useState([]); // main state

  // -----------------------------------------------------
  // 1️⃣ INITIALIZE attributes from productData (only once)
  // -----------------------------------------------------
  useEffect(() => {
    if (
      productData?.attributes?.length &&
      productData?.variants?.length &&
      addedAttributes.length === 0
    ) {
      const attrNames = productData.attributes;

      // Transpose: collect values per attribute index
      const transposed = productData.variants.reduce((acc, variant) => {
        variant.options.forEach((opt, i) => {
          if (!acc[i]) acc[i] = new Set();
          acc[i].add(opt);
        });
        return acc;
      }, []);

      const reconstructed = attrNames.map((name, i) => ({
        name,
        values: Array.from(transposed[i] || []),
      }));

      setAddedAttributes(reconstructed);
      statup(reconstructed) // safe — runs only once
    }
  }, [productData]);

  // -----------------------------------------------------
  // 2️⃣ Generate VARIANTS whenever addedAttributes changes
  // -----------------------------------------------------

    const statup = (attributes) =>{

      if (attributes.length === 0) return;
      const names = attributes.map(a => a.name);
      const values = attributes.map(a => a.values);
      const combos = generateCombinations(values);
      const variants = combos.map(combo => ({
        options: combo,
        costPrice: "",
        compareAtPrice: "",
        sellPrice: "",
        variantSku: createSku(combo),
        variantMedias: [],
        variantWarehouseData: productData.warehouseData || [],
      }));

      setProductData(prev => ({
        ...prev,
        attributes: names,
        variants: variants,
      }));

    }

  // -----------------------------------------------------
  // Helper: SKU creator
  // -----------------------------------------------------
  const createSku = combo => {
    const titlePart = productData.title
      ? productData.title.replace(/\s+/g, "-").toUpperCase()
      : "PRODUCT";

    const optionsPart = combo
      .map(opt => opt.replace(/\s+/g, "-").toUpperCase())
      .join("-");

    return `${titlePart}-${optionsPart}`;
  };

  // -----------------------------------------------------
  // Save a NEW Attribute
  // -----------------------------------------------------
  const handleSave = () => {
    if (!attributeName.trim()) return toast.error("Attribute name required");
    if (attributeValues.length === 0)
      return toast.error("Please add attribute values");

    setAddedAttributes(prev => [
      ...prev,
      { name: attributeName.trim(), values: attributeValues },
    ]);
    statup([...addedAttributes, { name: attributeName.trim(), values: attributeValues }]);

    setAttributeName("");
    setAttributesValues([]);

    toast.success("Attribute added & variants updated");
  };

  // -----------------------------------------------------
  // Delete an attribute
  // -----------------------------------------------------
  const handleDelete = index => {
    setAddedAttributes(prev => prev.filter((_, i) => i !== index));
    statup(addedAttributes.filter((_, i) => i !== index));
  };

  const handleEdit = () => {
    toast("Edit feature coming later");
  };

  // ANT tag renderer
  const tagRender = props => {
    const { label, closable, onClose } = props;
    return (
      <Tag
        closable={closable}
        onClose={onClose}
        className="text-black bg-[#C6E7FF] my-1 px-3 py-1 rounded-lg font-semibold"
      >
        {label}
      </Tag>
    );
  };

  return (
    <div className="w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className="text-xl font-semibold">Attributes</h1>

      {/* SHOW ADDED ATTRIBUTES */}
      {addedAttributes.length > 0 && (
        <div className="flex flex-col gap-2 p-2 rounded-lg border w-full">
          {addedAttributes.map((attribute, index) => (
            <div
              key={index}
              className="relative px-3 py-2 flex flex-col gap-2 rounded-lg bg-gray-100 w-full shadow-md text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500">Name:</span>
                <span>{attribute.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-500">Values:</span>
                {attribute.values.map((value, vIndex) => (
                  <span
                    key={vIndex}
                    className="px-3 py-1 rounded-lg bg-[#C6E7FF]"
                  >
                    {value}
                  </span>
                ))}
              </div>

              <div className="absolute top-2 right-2 flex items-center gap-4">
                <button onClick={() => handleEdit(index)}>
                  <EditOutlined />
                </button>
                <button onClick={() => handleDelete(index)}>
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD NEW ATTRIBUTE */}
      <div className="w-full flex flex-col gap-2 px-4 py-2 shadow border rounded-lg">
        <div className="w-full flex gap-4 items-center justify-between">
          <p className="w-1/3">Name</p>
          <Input
            variant="filled"
            className="h-12 w-2/3"
            value={attributeName}
            onChange={e => setAttributeName(e.target.value)}
          />
        </div>

        <div className="w-full flex items-center gap-4 justify-between">
          <p className="w-1/3">Values</p>
          <Select
            mode="tags"
            variant="filled"
            className="w-2/3"
            value={attributeValues}
            onChange={setAttributesValues}
            tagRender={tagRender}
          />
        </div>

        <div className="w-full flex items-center gap-x-2 justify-end">
          <button className="btn btn-ghost">Discard</button>
          <button onClick={handleSave} className="btn btn-ghost">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attributes;
