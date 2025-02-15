/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */


const NavigationHead = ({handleSaveProduct}) => {
  return (
    <div className=" w-full bg-white px-10 py-4 flex items-center justify-between">
    <div className=" flex items-center gap-x-3">
        <button>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
        <path d="M19 12H5" stroke="black" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 19L5 12L12 5" stroke="black" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        </svg>
        </button>

        <span className=" text-xl font-semibold">Add Product</span>
    </div>
    <div className=" flex gap-3">
    <button className="btn btn-outline hover:bg-gray-200 hover:text-slate-800 ">Save As Draft</button>
    <button className="btn btn-neutral" onClick={() => handleSaveProduct()}>Save</button>
    </div>

  </div>
  )
}

export default NavigationHead