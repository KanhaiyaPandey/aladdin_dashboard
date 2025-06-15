import { useState } from "react";
import toast from "react-hot-toast";
import { customFetch } from "../utils/Helpers";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ArrowLeftOutlined } from "@ant-design/icons";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategory({ ...category, image: file });
  };

  const handleCreateCategory = async () => {
    if (!category.name || !category.image || !category.description) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("description", category.description);
      formData.append("image", category.image);

      const response = await customFetch.post("/create-category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Category created successfully!");
      navigate("/categories");
    } catch (error) {
      toast.error(error.response?.data || "Failed to create category.");
    }
  };

  return (
    <main className=" mx-[3%] my-10 p-8">
      <div className="flex items-center gap-4 mb-6 ">
        <Link to="/categories">
          <ArrowLeftOutlined className="text-lg" />
        </Link>

        <h2 className="text-xl font-semibold ">Add New Category</h2>
      </div>

      <div className="mb-4">
        <h2 className="my-2 block">Category Name</h2>
        <TextField
          fullWidth
          label="Enter category name"
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <h2 className="my-2 block">Description</h2>
        <TextField
          fullWidth
          label="Start describing about category"
          multiline
          rows={2}
          value={category.description}
          onChange={(e) =>
            setCategory({ ...category, description: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-600 block mb-1">Category Image</label>

        <input
          accept="image/*"
          id="upload-image"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <label htmlFor="upload-image">
          <Button
            variant="solid"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{
              width: "100%",
              height: "4rem",
              padding: "15px",
              borderRadius: "3px",
              border: "1px solid #adb3af",
              justifyContent: "flex-start",
              textTransform: "unset",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#000",
                cursor: "pointer",
              },
            }}
          >
            {category.image ? category.image.name : "Upload Image"}
          </Button>
        </label>

        {/* Optional preview */}
        {category.image && (
          <img
            src={URL.createObjectURL(category.image)}
            alt="preview"
            className="w-40 h-40 object-cover mt-4 rounded-md"
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCreateCategory}
          className="bg-black/80 hover:bg-black text-white px-6 py-2 rounded-lg"
        >
          Create Category
        </button>
      </div>
    </main>
  );
};

export default CreateCategory;
