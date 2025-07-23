/* eslint-disable react/prop-types */
import { CloudUploadOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useEffect, useRef } from "react";

const VariantMediasModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedGroup = [],
  productData,
  setProductData,
}) => {
  const mediaRefs = useRef({});

  useEffect(() => {
    console.log("selectedGroup: ", selectedGroup);
  }, [selectedGroup]);

  const handleMediaCheckboxChange = (checked, media) => {
    const updatedVariants = [...productData.variants];

    selectedGroup.forEach((variant) => {
      const index = updatedVariants.findIndex(
        (v) => v.options.join("|") === variant.options.join("|")
      );

      if (index !== -1) {
        const target = updatedVariants[index];
        target.variantMedias = Array.isArray(target.variantMedias) ? target.variantMedias : [];


        if (checked) {
          if (!target.variantMedias.some((m) => m.mediaId === media.mediaId)) {
            target.variantMedias.push(media);
          }
        } else {
          target.variantMedias = target.variantMedias.filter(
            (m) => m.mediaId !== media.mediaId
          );
        }
      }
    });

    setProductData((prev) => ({
      ...prev,
      variants: updatedVariants,
    }));
  };

const isMediaChecked = (media) => {
  if (!selectedGroup || !selectedGroup.length) return false;

  return selectedGroup.every((variant) =>
    (variant?.variantMedias ?? []).some((m) => m.mediaId === media.mediaId)
  );
};

  return (
    <Modal
      title="Select Medias"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
    >
      <div className="w-full grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 items-center gap-4 p-2">
        {productData.productMedias.map((media) => {
          const checked = isMediaChecked(media);

          // Create a ref for this media if not already
          if (!mediaRefs.current[media.mediaId]) {
            mediaRefs.current[media.mediaId] = React.createRef();
          }

          return (
            <div
              key={media.mediaId}
              className="w-full relative overflow-hidden h-full p-1 rounded border cursor-pointer"
              onClick={() => {
                mediaRefs.current[media.mediaId]?.current?.click();
              }}
            >
              <img
                src={media.url}
                className="object-cover rounded"
                alt="media"
              />
              <input
                ref={mediaRefs.current[media.mediaId]}
                type="checkbox"
                checked={checked}
                readOnly
                className="checkbox w-4 h-4 rounded checkbox-success border border-gray-300 active:border-gray-300 focus:border-gray-300 absolute top-1 left-1 pointer-events-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMediaCheckboxChange(!checked, media);
                }}
              />
            </div>
          );
        })}

        <div className="w-full hidden overflow-hidden h-full  flex-col gap-2 items-center justify-center rounded border">
          <CloudUploadOutlined />
          <span className="text-xs">Upload More</span>
        </div>
      </div>
    </Modal>
  );
};

export default VariantMediasModal;
