"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Control, useFormContext } from "react-hook-form";
import imageCompression from "browser-image-compression";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import { createImageURLs, createFileList } from "@/utils";

export default function ItemImages({ control }: { control: Control<any> }) {
  const { setValue, watch } = useFormContext();
  const [disabled, setDisabled] = useState(false);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (files: FileList) => {
    const existingFilesArray = Array.from(
      (watch("image") as FileList) || new FileList()
    );
    const newFilesArray = Array.from(files);
    const combinedFilesArray = [...existingFilesArray, ...newFilesArray];

    const newURLs = combinedFilesArray.map((file) => URL.createObjectURL(file));
    setImageURLs((prevURLs) => [...prevURLs, ...newURLs]);

    const newFileList = createFileList(combinedFilesArray);
    setValue("image", newFileList);
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
    return image ? createImageURLs(image) : [];
  }, [image]);

  useEffect(() => {
    return () => {
      imageURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageURLs]);

  useEffect(() => {
    setImageURLs(images);
  }, [images]);

  return (
    <div className="flex flex-col gap-y-[30px]">
      <div className="flex flex-col gap-y-3.5">
        <p className="text-slate-800 font-medium">Upload Product Images</p>
        <CustomFormField
          control={control}
          fieldType={FormFieldType.SKELETON}
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
                    src={imageURLs[0] || "/images/default-img.png"}
                    alt="default-img"
                    width={103}
                    height={103}
                    className="rounded-lg border border-gray-3 object-contain"
                  />
                  <Image
                    src={imageURLs[1] || "/images/default-img.png"}
                    alt="default-img"
                    width={103}
                    height={103}
                    className="rounded-lg border border-gray-3 object-contain"
                  />
                  <Image
                    src={imageURLs[2] || "/images/default-img.png"}
                    alt="default-img"
                    width={103}
                    height={103}
                    className="rounded-lg border border-gray-3 object-contain"
                  />
                  <Image
                    src={imageURLs[3] || "/images/default-img.png"}
                    alt="default-img"
                    width={103}
                    height={103}
                    className="rounded-lg border border-gray-3 object-contain"
                  />
                  <Image
                    src={imageURLs[4] || "/images/default-img.png"}
                    alt="default-img"
                    width={103}
                    height={103}
                    className="rounded-lg border border-gray-3 object-contain"
                  />
                </div>
              </div>
            </FormControl>
          )}
        />
      </div>
      <CustomFormField
        control={control}
        fieldType={FormFieldType.TEXTAREA}
        placeholder="This item..."
        name="description"
        className="py-3 px-4 rounded-lg border border-gray-3"
        label="Description"
      />
    </div>
  );
}
