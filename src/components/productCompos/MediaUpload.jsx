/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { customFetch, publicFetch } from "../../utils/Helpers";
import { MdDelete } from "react-icons/md";


const MediaUpload = ({ productData, setProductData }) => {
  const fileInputRef = useRef(null);
  const [medias, setMedias] = useState([]);
  const [inputFile, setInputFile] = useState([]);
  const [dragging, setDragging] = useState(false);


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      processFiles(files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files) {
      processFiles(files);
    }
  };

  const processFiles = (files) => {
    const filesArray = Array.from(files).map((file, index) => ({
      file,
      uploading: true,
      sequence: medias.length + index + 1,
      url: URL.createObjectURL(file),
      tempId: `${Date.now()}-${index}`,
    }));

    setMedias((prev) => [...prev, ...filesArray]);
    uploadFiles(filesArray);
  };

  const uploadFiles = async (filesArray) => {
    const formData = new FormData();
    filesArray.forEach((fileObject) => {
      formData.append("media", fileObject.file);
    });
    try {
      const response = await customFetch.post("/media/upload-media", formData);
      const uploadedList = response.data.data;
      // Ensure each uploaded object has a url property for preview
      uploadedList.forEach((uploaded) => {
        if (!uploaded.url && uploaded.mediaUrl)
          uploaded.url = uploaded.mediaUrl;
      });
      setMedias((prev) => {
        // Replace uploading files with uploaded files
        let newMedias = [...prev];
        filesArray.forEach((fileObject, idx) => {
          const uploaded = uploadedList[idx];
          newMedias = newMedias.map((m) =>
            m.tempId === fileObject.tempId
              ? { ...uploaded, uploading: false }
              : m
          );
        });
        return newMedias;
      });
      setProductData((prevData) => {
        let newProductMedias = [...prevData.productMedias];
        filesArray.forEach((fileObject, idx) => {
          const uploaded = uploadedList[idx];
          newProductMedias = [
            ...newProductMedias.filter((m) => m.tempId !== fileObject.tempId),
            { ...uploaded, uploading: false },
          ];
        });
        return {
          ...prevData,
          productMedias: newProductMedias,
        };
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      setMedias((prev) =>
        prev.map((m) =>
          filesArray.some((f) => f.tempId === m.tempId)
            ? { ...m, uploading: false, error: true }
            : m
        )
      );
    }
  };

  useEffect(() => {
     console.log("length",medias.length);
     
  }, [medias]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleRemoveMedia = (id) => {
    setProductData((prev) => ({
      ...prev,
      productMedias: prev.productMedias?.filter(
        (media) => media.mediaId !== id
      ),
    }));
  };

  useEffect(() => {
    setMedias(productData.productMedias);
  }, [productData.productMedias]);

  return (
    <div className="w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className="text-xl font-semibold">Product Medias</h1>

      <div
        className={`w-full flex gap-3  cursor-pointer rounded-2xl p-2 min-h-[29vh] ${
          dragging ? "bg-gray-300" : ""
        } transition-all duration-300 ease-in-out`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {medias.length === 0 && (
          <div className="w-full items-center justify-center flex">
            <button
              className="px-4 py-2 rounded-full bg-black text-white text-center font-light"
              onClick={handleButtonClick}
            >
              Upload image
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </button>
          </div>
        )}

        {medias.length > 0 && (
          <div className=" w-full flex flex-col  gap-2">
            <section className=" flex  gap-2">

              {/* 1st image */}

              <div className=" w-[210px] rounded-lg relative bg-white border h-[210px] aspect-square shadow-md">
                {medias[0].uploading ? (
                  <div className="skeleton rounded-lg w-full h-full aspect-square"></div>
                ) : (
                  <>
                    <img
                      src={medias[0].url}
                      className="rounded-lg w-full h-full oaspect-square object-contain "
                      alt=""
                    />

                    <button
                      onClick={() => handleRemoveMedia(medias[0].mediaId)}
                      className=" absolute top-1 right-1"
                    >
                     <MdDelete size={20} color="red" />
                    </button>
                  </>
                )}
              </div>

              {/* upper rows */}
              <div className=" flex flex-wrap gap-2">
                {medias.slice(1, 7).map((media, index, arr) => (
                  
                  <div
                    key={index}
                    className={`rounded-lg relative bg-white border h-[100px] w-[100px] flex items-center justify-center aspect-square`}
                  >
                    {media.uploading ? (
                      <div className="skeleton rounded-lg w-full h-full"></div>
                    ) : (
                      <>
                        <img
                          src={media.url}
                          className="rounded-lg w-full h-full object-contain shadow-md"
                          alt=""
                        />
                        <button
                          onClick={() => handleRemoveMedia(media.mediaId)}
                          className="absolute top-1 right-1"
                        >
                           <MdDelete size={20} color="red" />
                        </button>
                      </>
                    )}
                  </div>
                ))}

                {medias.length < 7 && (
                  <div className=" aspect-square border items-center justify-center flex rounded-lg shadow-sm w-[100px] h-[100px]">
                    <button className="px-4 py-2 " onClick={handleButtonClick}>
                      +
                      <input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* lower rows */}

           {medias.length >= 7 && <div
              className={`flex w-full flex-wrap gap-2`}
            >
              
            </div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;