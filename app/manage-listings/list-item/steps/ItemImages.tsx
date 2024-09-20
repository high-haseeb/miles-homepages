"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Control, useFormContext } from "react-hook-form";
import imageCompression from "browser-image-compression";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType, ItemImagesProps } from "@/types";
import { base64ToFile, fileToBase64 } from "@/utils";

export default function ItemImages({ control }: { control: Control<any> }) {
  const { setValue, watch } = useFormContext();
  const [disabled, setDisabled] = useState(false);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [itemImages, setItemImages] = useState<ItemImagesProps[]>();

  const handleFileChange = async (files: FileList) => {
    if (imageURLs?.length === 5) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
    const fileArray = Array.from(files);

    const compressedFiles = await Promise.all(
      fileArray.map((file) =>
        imageCompression(file, {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        })
      )
    );

    const newURLs = compressedFiles.map((file) => URL.createObjectURL(file));
    setImageURLs((prevURLs) => [...prevURLs, ...newURLs]);

    const base64Files = await Promise.all(compressedFiles.map(fileToBase64));
    const currentImages = watch("image") || [];
    setValue("image", [...currentImages, ...base64Files]);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileChange(files);
    }
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  const image = watch("image");

  const images = useMemo(() => {
    return image
      ? Array.from(image)
          .filter((file: any) => typeof file === "string")
          .map((base64: string, index: number) =>
            URL.createObjectURL(base64ToFile(base64, `image-${index}`))
          )
      : [];
  }, [image]);

  useEffect(() => {
    return () => {
      imageURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageURLs]);

  useEffect(() => {
    setImageURLs(images);
  }, [images]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const formDetails = localStorage.getItem("listItemForm");
      if (formDetails) {
        const parsedFormDetails = JSON.parse(formDetails);
        setItemImages(parsedFormDetails?.item_images);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-[30px]">
      <div className="flex flex-col gap-y-3.5">
        <p className="text-slate-800 font-medium">Upload Product Images</p>
        <CustomFormField
          control={control}
          fieldtype={FormFieldType.SKELETON}
          name="image"
          className="py-3 px-4 rounded-lg border border-gray-3"
          renderSkeleton={(field) => (
            <FormControl>
              <div>
                <div
                  className={`flex flex-col items-center w-full pt-6 pb-11 rounded-lg border border-dashed border-mist-500 ${
                    isDragging ? "bg-gray-200" : ""
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Image
                    src="/icons/img-upload-icon.svg"
                    alt="upload image icon"
                    height={50}
                    width={55.64}
                    className="mb-5"
                  />
                  <label
                    htmlFor="image"
                    className={`text-center text-black mb-[13px] cursor-pointer ${
                      disabled ? "cursor-not-allowed" : ""
                    }`}
                    onClick={handleLabelClick}
                  >
                    Drag and drop images or{" "}
                    <span className="text-green-500 font-medium">
                      Browse here
                    </span>
                  </label>
                  <p className="text-center text-slate-300">
                    PNG, JPG and a maximum file size of 10 mb
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    id="image"
                    disabled={disabled}
                    className={`hidden outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center justify-between mt-2.5">
                  <Image
                    src={
                      imageURLs[0] ||
                      itemImages!?.[0]?.image_url ||
                      "/images/default-img.png"
                    }
                    alt="default-img"
                    width={103}
                    height={103}
                    className="rounded-lg border border-gray-3 object-contain w-[42px] h-[42px] sm:w-[103px] sm:h-[103px]"
                  />
                  <Image
                    src={
                      imageURLs[1] ||
                      itemImages!?.[1]?.image_url ||
                      "/images/default-img.png"
                    }
                    alt="default-img"
                    width={103}
                    height={103}
                    className="rounded-lg border border-gray-3 object-contain w-[42px] h-[42px] sm:w-[103px] sm:h-[103px]"
                  />
                  <Image
                    src={
                      imageURLs[2] ||
                      itemImages!?.[2]?.image_url ||
                      "/images/default-img.png"
                    }
                    alt="default-img"
                    width={103}
                    height={103}
                    className="rounded-lg border border-gray-3 object-contain w-[42px] h-[42px] sm:w-[103px] sm:h-[103px]"
                  />
                  <Image
                    src={
                      imageURLs[3] ||
                      itemImages!?.[3]?.image_url ||
                      "/images/default-img.png"
                    }
                    alt="default-img"
                    width={103}
                    height={103}
                    className="rounded-lg border border-gray-3 object-contain w-[42px] h-[42px] sm:w-[103px] sm:h-[103px]"
                  />
                  <Image
                    src={
                      imageURLs[4] ||
                      itemImages!?.[4]?.image_url ||
                      "/images/default-img.png"
                    }
                    alt="default-img"
                    width={103}
                    height={103}
                    className="rounded-lg border border-gray-3 object-contain w-[42px] h-[42px] sm:w-[103px] sm:h-[103px]"
                  />
                </div>
              </div>
            </FormControl>
          )}
        />
      </div>
      <CustomFormField
        control={control}
        fieldtype={FormFieldType.TEXTAREA}
        placeholder="This item..."
        name="description"
        className="py-3 px-4 rounded-lg border border-gray-3"
        label="Description"
      />
    </div>
  );
}
