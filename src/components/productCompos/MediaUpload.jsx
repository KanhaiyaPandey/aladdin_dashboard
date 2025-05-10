import { useEffect, useRef, useState } from "react";
import { customFetch } from "../../utils/Helpers";

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
    // Add files to the state with a temporary preview and `uploading: true`
    const filesArray = Array.from(files).map((file, index) => ({
      file,
      uploading: true,
      sequence: index + 1,
      url: URL.createObjectURL(file), // Temporary preview
    }));

    setMedias((prev) => [...prev, ...filesArray]);

    uploadFiles(filesArray);
  };

  const uploadFiles = async (filesArray) => {
    const updatedMedias = [...medias]; // Start with the current state

    for (const fileObject of filesArray) {
      const formData = new FormData();
      formData.append("media", fileObject.file);

      try {
        const response = await customFetch.post(
          "/media/upload-media",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("response:", response.data);
        updatedMedias.push(response.data[0]);
      } catch (error) {
        console.error("Error uploading files:", error);
        updatedMedias.push({
          uploading: false,
        });
      }
    }
    setMedias(updatedMedias);
    setProductData((prevData) => ({
      ...prevData,
      productMedias: updatedMedias,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  useEffect(() => {
    // console.log("medias:", medias);
    setMedias(productData.productMedias);
  }, [productData]);

  return (
    <div className="w-full flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className="text-xl">Product Medias</h1>

      <div
        className={`w-full flex gap-3 justify-center cursor-pointer rounded-2xl p-2 min-h-[29vh] ${
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
          <>
            <div className="w-3/12 rounded-lg relative bg-white border max-h-[190px] aspect-square shadow-md">
              {medias[0].uploading ? (
                <div className="skeleton rounded-lg w-full h-full aspect-square"></div>
              ) : (
                <>
                  <img
                    src={medias[0].url}
                    className="rounded-lg w-full h-full oaspect-square object-contain "
                    alt=""
                  />

                  <button className=" absolute top-1 right-1">
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="-0.5 0 19 19"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                    >
                      <g
                        id="out"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                        sketch:type="MSPage"
                      >
                        <path
                          d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 L4.91666667,14.8888889 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 L15,3.46500003 L15,3.46500003 Z"
                          id="path"
                          fill="#000000"
                          sketch:type="MSShapeGroup"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </>
              )}
            </div>
            <div className="w-9/12 grid grid-cols-5 gap-x-2">
              {medias.slice(1).map((media, index) => (
                <div
                  key={index}
                  className="rounded-lg relative bg-white border flex items-center justify-center aspect-square"
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
                      <button className=" absolute top-1 right-1">
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="-0.5 0 19 19"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                        >
                          <g
                            id="out"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                            sketch:type="MSPage"
                          >
                            <path
                              d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 L4.91666667,14.8888889 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 L15,3.46500003 L15,3.46500003 Z"
                              id="path"
                              fill="#000000"
                              sketch:type="MSShapeGroup"
                            ></path>
                          </g>
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              ))}

              <div className=" aspect-square border items-center justify-center flex rounded-lg shadow-sm">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
