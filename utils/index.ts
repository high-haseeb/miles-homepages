// files manipulation

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

export function createFileList2(file: File): FileList {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer.files;
}

export async function bloburlToFileList(
  imageUrl: string,
  fileName: string
): Promise<FileList> {
  // Fetch the image data from the URL
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  // Create a File from the Blob
  const file = new File([blob], fileName, { type: blob.type });

  // Create a DataTransfer to hold the File
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);

  // Return the FileList
  return dataTransfer.files;
}

export function identifyUrlType(url: string): "base64" | "blob" | "unknown" {
  // Check if the string starts with the base64 data URL scheme
  if (url.startsWith("data:")) {
    return "base64";
  }

  // Check if the string starts with the Blob URL scheme
  if (url.startsWith("blob:")) {
    return "blob";
  }

  // If neither, return 'unknown'
  return "unknown";
}
export function base64ToFileList(base64: string, filename: string) {
  const file = base64ToFile(base64, filename);
  const fileList = createFileList2(file);
  return fileList;
}

// Others

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

export const toCurrency = (number: number, country: string = "en-NG") => {
  const formatter = new Intl.NumberFormat(country, {
    style: "currency",
    currency: country === "en-NG" ? "NGN" : "GBP",
  });

  return formatter.format(number).split(".00")[0];
};

export const capitalize = (value: string) => {
  const valArr = value.split("");
  const firstLetter = valArr.shift();
  return [firstLetter!.toUpperCase(), ...valArr].join("");
};

export const formattedStatus = (status: string): string => {
  if (status?.toLowerCase().includes("pending")) {
    return "pending";
  } else if (status?.toLowerCase().includes("awaiting")) {
    return "awaiting";
  } else if (status?.toLowerCase().includes("completed")) {
    return "completed";
  } else if (status?.toLowerCase().includes("rejected")) {
    return "rejected";
  } else if (status?.toLowerCase().includes("available")) {
    return "available";
  } else {
    return "progress";
  }
};
