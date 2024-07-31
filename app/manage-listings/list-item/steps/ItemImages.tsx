"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Control, useFormContext } from "react-hook-form";
import imageCompression from "browser-image-compression";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export default function ItemImages({ control }: { control: Control<any> }) {
  const { setValue, watch } = useFormContext();
  const [disabled, setDisabled] = useState(false);
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 5) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
    const fileArray = Array.from(files!);

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

  // Clean up the object URLs when the component unmounts or the images change
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
              <div className="flex flex-col gap-y-2.5">
                <div className="flex flex-col items-center w-full pt-6 pb-11 rounded-lg border border-dashed border-mist-500">
                  <Image
                    src="/icons/img-upload-icon.svg"
                    alt="upload image icon"
                    height={50}
                    width={55.64}
                    className="mb-5"
                  />
                  <label
                    htmlFor="image"
                    className="text-center text-black mb-[13px] cursor-pointer"
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
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex items-center justify-between">
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
