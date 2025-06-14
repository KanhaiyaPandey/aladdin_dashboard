/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Input, Select, Tag } from "antd"
import { useState } from "react";
import { generateCombinations } from "../../utils/Helpers";

const Attributes = ({productData, setProductData}) => {
  const [attributeName, setAttributeName] = useState("");
  const [attributeValues, setAttributesValues] = useState([]);
  const [allValues, setAllValues] = useState([]);
  const [addedAttributes, setAddedAttributes] = useState([]);


  const handleChange = (values) => {
    setAttributesValues(values);
  };

  const handleSave = () => {
    const updatedAttributes = [...(productData.attributes || []), attributeName];
    const updatedAllValues = [...allValues, attributeValues];

    setAddedAttributes(prev => [
        ...prev,
        { name: attributeName, values: attributeValues }
    ]);

    setAllValues(updatedAllValues);
    const combinations = generateCombinations(updatedAllValues);

    const structuredVariants = combinations.map((combo) => ({
    options: combo,
    costPrice: "",
    compareAtPrice: "",
    variantMedias: [],
    variantWarehouseData: []
  }));

//   setProductData((prev) => ({
//     ...prev,
//     attributes: updatedAttributes,
//     variants: structuredVariants
//   }));

    setProductData((prev) => ({
      ...prev,
      attributes: updatedAttributes,
       variants: structuredVariants
    }));

    setAttributeName("");
    setAttributesValues([]);
  };




  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        closable={closable}
        onClose={onClose}
        closeIcon={
          <svg width="12" height="12" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4.5L4 12.5" stroke="black" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 4.5L12 12.5" stroke="black" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        }
        className="text-black bg-[#C6E7FF] my-1 flex items-center gap-x-1 mx-1 px-3 border-none py-1 rounded-lg font-semibold"
      >
        {label}
      </Tag>
    );
  };

  return (
    <div className="w-full  flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl  border shadow-md lato">
         <h1 className=" text-xl font-semibold ">Attributes</h1> 

         <div className=" flex flex-col gap-2">

          { addedAttributes.length > 0 && 
          <div className="flex flex-col gap-2 p-2  rounded-lg border w-full ">

            { addedAttributes.map((attribute, index) =>(

            <div key={index} className=" px-3 py-2 flex flex-col gap-2 rounded-lg bg-gray-100 w-full shadow-md text-sm">
                <div className=" flex items-center w-full gap-3">
                    <span>Name:</span>
                     <span>{attribute.name}</span>       
                </div>

                 <div className=" flex items-center w-full gap-3">
                    <span>Values:</span>
                    {attribute.values?.map((value, index) =>(
                        <span className=" px-3 py-1 min-w-10 rounded-lg bg-[#C6E7FF] flex items-center justify-center" key={index}>{value}</span>
                    ))}      
                </div>

            </div>

            ))}

           </div>

          }

         <div className=" w-full flex flex-col gap-2 items-center justify-center px-4 py-2 shadow border rounded-lg">
            <div className=" w-full flex gap-4 items-center justify-between">
               <p className=" w-1/3">Name</p>
                 <Input
                    className="h-12 w-2/3"
                    variant="filled"
                    value={attributeName}
                    onChange={(e) => setAttributeName(e.target.value)}
                    />
            </div>
            <div className=" w-full flex items-center gap-4 justify-between">
               <p className=" w-1/3">Values</p>
                 <Select
                            mode="tags"
                            value={attributeValues} 
                            variant="filled"
                            className="w-2/3 text-black flex items-center justify-center"
                            onChange={handleChange}
                            tagRender={tagRender}
                            suffixIcon
                          />
            </div>

           <div className=" w-full flex items-center gap-x-2 justify-end">
            <button className="btn btn-ghost">Discard</button>
            <button onClick={handleSave} className="btn btn-ghost">Save</button>
           </div>

         </div>

         </div>


    </div>
  )
}

export default Attributes