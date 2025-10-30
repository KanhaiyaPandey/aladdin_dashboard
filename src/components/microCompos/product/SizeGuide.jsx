/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Image, Upload } from "antd";
import { customFetch } from "../../../utils/Helpers";

const SizeGuide = ({ productData, setProductData }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
        {
          uid: "-1",
          name: "size-guide.png",
          status: "done",
          url: productData.sizeGuide,
        },
  ]);

  useEffect(() => {
    // initialize fileList from productData.sizeGuide when component mounts / productData changes
    if (productData?.sizeGuide) {
      setFileList([
        {
          uid: "-1",
          name: "size-guide.png",
          status: "done",
          url: productData.sizeGuide,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [productData]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // custom upload to call API and update productData.sizeGuide
  const customUpload = async ({ file, onProgress, onSuccess, onError }) => {
    try {
      // add a temporary uploading file entry so antd spinner shows
      const uploadingFile = {
        uid: file.uid || "-uploading",
        name: file.name,
        status: "uploading",
        percent: 0,
      };
      setFileList([uploadingFile]);

      const formData = new FormData();
      formData.append("media", file);

      const response = await customFetch.post("/media/upload-media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          if (e.total) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress({ percent }, file);
            setFileList((prev) =>
              prev.map((f) =>
                f.uid === uploadingFile.uid
                  ? { ...f, percent, status: "uploading" }
                  : f
              )
            );
          }
        },
      });

      const uploadedList = response?.data?.data || [];
      const url = uploadedList[0]?.url;

      if (url) {
        const doneFile = {
          uid: file.uid || "-done",
          name: file.name,
          status: "done",
          url,
        };
        setFileList([doneFile]);
        setProductData((prev) => ({ ...prev, sizeGuide: url }));
        onSuccess(response.data, file);
      } else {
        throw new Error("No URL returned from upload");
      }
    } catch (err) {
      // mark as error in UI
      setFileList((prev) =>
        prev.map((f) =>
          f.status === "uploading" ? { ...f, status: "error" } : f
        )
      );
      onError && onError(err);
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    // keep fileList in sync (removals etc.)
    setFileList(newFileList);
    // if user removed file, clear productData.sizeGuide
    if (newFileList.length === 0) {
      setProductData((prev) => ({ ...prev, sizeGuide: "" }));
    }
  };

  return (
    <>
      <Upload
        accept="image/*"
        listType="picture-card"
        fileList={fileList}
        customRequest={customUpload}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
        onRemove={() => {
          setFileList([]);
          setProductData((prev) => ({ ...prev, sizeGuide: "" }));
        }}
      >
        {fileList.length < 1 && "+ Upload"}
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
    </>
  );
};
export default SizeGuide;
