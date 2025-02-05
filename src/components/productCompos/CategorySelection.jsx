import { message, Select } from "antd"
import { useState } from "react";

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
const CategorySelection = ({productData, setProductData}) => {
   
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  //  const handlemsg = () =>{
  //   message.success('hello')
  //  }


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

            {/* <ul className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-10">
              <li className="flex flex-col items-center relative">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
                  1
                </div>
              
                <div className="hidden lg:block absolute top-1/2 left-full w-16 h-0.5 bg-blue-500"></div>
              </li>
              <li className="flex flex-col items-center relative">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
                  2
                </div>
        
                <div className="hidden lg:block absolute top-1/2 left-full w-16 h-0.5 bg-gray-300"></div>
              </li>
              <li className="flex flex-col items-center relative">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full">
                  3
                </div>
               
                <div className="hidden lg:block absolute top-1/2 left-full w-16 h-0.5 bg-gray-300"></div>
              </li>
              
              <li className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full">
                  4
                </div>
               
              </li>
              
            </ul> */}

          </div>

    </div>
  )
}

export default CategorySelection