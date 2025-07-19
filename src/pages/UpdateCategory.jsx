/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { customFetch, publicFetch } from "../utils/Helpers";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import {  DeleteOutlined, InboxOutlined, RollbackOutlined } from "@ant-design/icons";
import AdminHeader from "../components/dashboardCompos/AdminHeader";
import { Input, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import BackBtn from "../components/BackBtn";



const UpdateCategory = ({activePage}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    title: "",
    description: "",
  });
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const inputRef = useRef(null);


  const handleButtonClick = () => {
    inputRef.current.click();
  };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        setBanner(file); 
        setBannerPreview(URL.createObjectURL(file));
      }
    };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () =>{
    setLoading(true);

     const formData = new FormData();

      if (category.title === "" || category.description === "") {
        message.error("Title & Description required");
        setLoading(false);
        return
      }
      if (banner) {
        formData.append("banner", banner);
      }else{
        message.error("banner is required");
        setLoading(false);
        return;
      }
      formData.append("category", JSON.stringify(category));
      try {
        const response = await customFetch.put(`/category/update-category/${id}`, formData,);
        message.success(response.data.message);
        setLoading(false);
        navigate("/categories"); 
      } catch (error) {
          message.error(error?.response?.data?.details); 
          setLoading(false);
      }
    }



    useEffect(() =>{
      getCategory()  
    },[])

    const getCategory = async () =>{
      try {
         const res = await publicFetch.get(`/category/${id}`)
            setData(res.data.data);
              setCategory({
                title: res.data.data.title || "",
                description: res.data.data.description || "",
              });
              setBanner(res.data.data.banner[0] || null);
              setBannerPreview(res.data.data.banner[0] || null)
      } catch (error) {
        toast("some thing went wrong try after some time")
      }
    }

    const removeImg = () =>{
        setBanner(null);
        setBannerPreview(null);
    }

  return (
        <main className="flex flex-col flex-1 m-4  lato text-slate-900 px-4 gap-8 ">
        <AdminHeader />
        <div className="flex items-center gap-x-3">
        <BackBtn/>
        <span className="text-xl font-semibold capitalize">{activePage} {`"${category.title}"`}</span>
      </div>

        <div className=" w-full rounded-xl bg-white p-5 shadow flex items-start gap-5">

        <div className=" p-2 flex flex-col gap-5 w-1/2 ">
          <div className=" flex flex-col gap-1 items-start">
            <span className="text-gray-500">Category Name</span>
            <Input
              name="title"
               onChange={handleChange}
               value={category.title}
              placeholder="Category Name"
              variant="filled" className=" h-12" />
          </div> 

          <div className=" flex flex-col gap-1 items-start">
            <span className="text-gray-500">Category Description</span>
              <TextArea
              name="description"
              placeholder=""
              className=" p-2 mt-2"
              onChange={handleChange}
               value={category.description}
              variant="filled"/>
          </div> 

          <button disabled={loading} onClick={handleSave} className=" btn btn-success">{loading ? <span className=" loading loading-dots loading-md"></span> : `Save`}</button>

        </div>


      <div className="w-1/2 h-[270px] flex flex-col items-center justify-center p-4 border border-dashed rounded-xl gap-3">
        {!banner && (
          <>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={handleFileChange}
            />
            <button
              className="btn p-3 rounded-lg btn-neutral"
              onClick={handleButtonClick}
            >
              Upload Banner Image
            </button>
          </>
        )}

          {bannerPreview && (
            <div className=" w-full h-full relative flex items-center justify-center">
             <img
              src={bannerPreview}
              alt="Banner Preview"
              className="mt-2 w-full h-full  rounded-md object-contain"
            />
            <button onClick={() => removeImg()} className=" absolute top-0 bottom-0 left-0 right-0">
              <DeleteOutlined className=" text-white" />
            </button>
            </div>

          )}
        </div>

        </div>

     </main>
  )
}

export default UpdateCategory