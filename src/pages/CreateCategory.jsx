/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { customFetch, publicFetch } from "../utils/Helpers";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import {
  DeleteOutlined,
  InboxOutlined,
  PlusOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import AdminHeader from "../components/dashboardCompos/AdminHeader";
import { Image, Input, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";

const CreateCategory = ({ activePage }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    title: "",
    description: "",
    banner: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
    category;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await customFetch.post(
        "/category/create-category",
        category
      );
      message.success(response.data.message);
      setLoading(false);
      navigate("/categories");
    } catch (error) {
      message.error(error?.response?.data?.details || "Something went wrong");
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      getCategory();
      setCategory((prev) => ({
        ...prev,
        parentCategoryId: id,
      }));
    }
  }, [id]);

  const getCategory = async () => {
    try {
      const res = await publicFetch.get(`/category/${id}`);
      setData(res.data.data);
    } catch (error) {
      toast("some thing went wrong try after some time");
      navigate("/categories");
    }
  };

  // testing

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    setFileList([
      {
        uid: file.uid,
        name: file.name,
        status: "uploading",
        percent: 0,
      },
    ]);
    const formData = new FormData();
    formData.append("media", file);
    try {
      const response = await customFetch.post("/media/upload-media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setFileList([
            {
              uid: file.uid,
              name: file.name,
              status: "uploading",
              percent: 50,
            },
          ]);
        },
      });
      const uploadedUrl =
        response.data.data[0].url || response.data.data[0].mediaUrl;
      setCategory((prev) => ({ ...prev, banner: uploadedUrl }));
      setFileList([
        {
          uid: file.uid,
          name: file.name,
          url: uploadedUrl,
          percent: 100,
        },
      ]);
      message.success("Image uploaded successfully");
      if (onSuccess) onSuccess();
    } catch (error) {
      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: "error",
          percent: 0,
        },
      ]);
      message.error("Image upload failed");
      if (onError) onError(error);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <main className="flex flex-col flex-1 m-4  lato text-slate-900 px-4 gap-8 ">
      <AdminHeader />
      <div className="flex items-center gap-x-3">
        <button onClick={goBack} className="btn" title="back">
          <RollbackOutlined />
        </button>
        <span className="text-xl font-semibold capitalize">
          {!id && activePage === "create catgeory" && `create category`}
          {activePage === "subcategory" &&
            `create subcategory for ${data?.title}`}
        </span>
      </div>

      <div className=" w-full rounded-xl bg-white p-5 shadow flex items-start gap-5">
        <div className=" p-2 flex flex-col gap-5 w-1/2 ">
          <div className=" flex flex-col gap-1 items-start">
            <span className=" text-gray-500">Banner</span>
            <Upload
              listType="picture-card"
              fileList={fileList}
              customRequest={handleImageUpload}
              onPreview={handlePreview}
              onRemove={() => {
                setFileList([]);
                setCategory((prev) => ({ ...prev, banner: "" }));
              }}
              maxCount={1}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>

          <div className=" flex flex-col gap-1 items-start">
            <span className="text-gray-500">Category Name</span>
            <Input
              name="title"
              onChange={handleChange}
              value={category.title}
              placeholder="Category Name"
              variant="filled"
              className=" h-12"
            />
          </div>

          <div className=" flex flex-col gap-1 items-start">
            <span className="text-gray-500">Category Description</span>
            <TextArea
              name="description"
              placeholder=""
              className=" p-2 mt-2"
              onChange={handleChange}
              value={category.description}
              variant="filled"
            />
          </div>

          <button
            disabled={loading}
            onClick={handleSave}
            className=" btn btn-success"
          >
            {loading ? (
              <span className=" loading loading-dots loading-md"></span>
            ) : (
              `Save`
            )}
          </button>
        </div>

        <div className=" w-1/2 p-2 border rounded-md">
          <Image
            width={"100%"}
            height={400}
            src={
              category?.banner ||
              "https://placehold.co/600x400?text=Banner+image"
            }
            style={{ objectFit: "contain" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              onRemove: () => {
                setFileList([]);
                setCategory((prev) => ({ ...prev, banner: "" }));
              },
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default CreateCategory;
