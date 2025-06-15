import { useState } from "react";
import toast from "react-hot-toast";
import { customFetch } from "../utils/Helpers";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";

const CreateCollection = () => {
  const navigate = useNavigate();
  const [collectionType, setCollectionType] = useState("Manual");
  const [collection, setCollection] = useState({
    name: "",
    description: "",
    image: null,
  });

    const handleCollectionTypeChange = (event) => {
    setCollectionType(event.target.value);
    };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }
    setCollection({ ...collection, image: file });
  };

  const handleCreateCollection = async () => {
    if (!collection.name || !collection.image || !collection.description) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", collection.name);
      formData.append("description", collection.description);
      formData.append("image", collection.image);

      const response = await customFetch.post("/create-collection", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        response.data.message || "Collection created successfully!"
      );
      navigate("/categories");
    } catch (error) {
      toast.error(error.response?.data || "Failed to create collection.");
    }
  };

  return (
    <main className="mx-[3%] my-10 p-8 max-w-full overflow-x-hidden">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/collections">
          <ArrowLeftOutlined className="text-lg" />
        </Link>
        <h2 className="text-xl font-semibold">Add New Collection</h2>
      </div>

      <div className="mb-4">
        <h2 className="my-2 block">Title</h2>
        <TextField
          fullWidth
          size="small"
          placeholder="E.g. Summer collection, Under 1K, Reguler use"
          value={collection.name}
          onChange={(e) =>
            setCollection({ ...collection, name: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <h2 className="my-2 block">Description</h2>
        <TextField
          fullWidth
          placeholder="Start describing about collection"
          multiline
          rows={4}
          value={collection.description}
          onChange={(e) =>
            setCollection({ ...collection, description: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-600 block mb-1">Media</label>
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
            {collection.image ? collection.image.name : "Add Image"}
          </Button>
        </label>

        {collection.image && (
          <img
            src={URL.createObjectURL(collection.image)}
            alt="preview"
            className="w-40 h-40 object-cover mt-4 rounded-md"
          />
        )}
      </div>

      <div className="text-pretty w-full mb-4">
        <h2 className="my-2 block">Collection Type</h2>

        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="collection-type-label"
            name="collection-type"
            value={collectionType}
            onChange={handleCollectionTypeChange}
          >
            <div>
              <FormControlLabel
                value="Manual"
                control={<Radio />}
                label="Manual"
              />
              <FormHelperText
                sx={{ marginLeft: "30px", color: "text.secondary", marginTop : "-1%" }}
              >
                Add products to this collection one by one. Learn more about
                manual collections.
              </FormHelperText>
            </div>

            <div className="mt-2">
              <FormControlLabel
                value="Automatic"
                control={<Radio />}
                label="Automatic"
              />
              <FormHelperText
                sx={{ marginLeft: "30px", color: "text.secondary" , marginTop : "-1%" }}
              >
                Existing and future products that match the conditions you set
                will automatically be added to this collection. Learn more about
                automated collections.
              </FormHelperText>
            </div>
          </RadioGroup>
        </FormControl>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCreateCollection}
          className="bg-black/80 hover:bg-black text-white px-6 py-2 rounded-lg"
        >
          Create Collection
        </button>
      </div>
    </main>
  );
};

export default CreateCollection;


