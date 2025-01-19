import { Select } from "antd"
import { useState } from "react";

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
const CategorySelection = () => {
   
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));


  return (
    <div className="w-full  flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
         <h1 className=" text-xl ">Category</h1> 

         <div className="w-full">
            <p className="text-gray-500">Product Categories</p>
            <Select
                mode="multiple"
                placeholder="Inserted are removed"
                className=" mt-2 h-12 w-full "
                variant="filled"
                value={selectedItems}
                onChange={setSelectedItems}
                options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
                />
        </div>


          <div className="w-full">
            <p className="text-gray-500">Product Tags</p>
            <Select
                mode="multiple"
                placeholder="Inserted are removed"
                className=" mt-2 h-12 w-full "
                variant="filled"
                value={selectedItems}
                onChange={setSelectedItems}
                options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
                />
          </div>

    </div>
  )
}

export default CategorySelection