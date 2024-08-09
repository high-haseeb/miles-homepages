export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const base64ToFile = (base64: string, filename: string): File => {
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

export function createImageURLs(fileList: FileList): string[] {
  return Array.from(fileList).map((file) => URL.createObjectURL(file));
}

export function createFileList(filesArray: File[]): FileList {
  const dataTransfer = new DataTransfer();
  filesArray.forEach((file) => dataTransfer.items.add(file));
  return dataTransfer.files;
}

export const formatPrice = (value: string) => {
  // Remove any non-digit characters except for periods
  value = value.replace(/[^0-9.]/g, "");

  // Split the value into integer and decimal parts
  const parts = value.split(".");
  let integerPart = parts[0];
  const decimalPart = parts.length > 1 ? "." + parts[1] : "";

  // Add commas to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return integerPart + decimalPart;
};
