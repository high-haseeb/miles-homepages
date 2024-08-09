import React from "react";
import FileIcon from "./vectors/FileIcon";

interface DownloadButtonProps {
  fileName: string;
  fileContent: string;
  fileType: string;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  fileName,
  fileContent,
  fileType,
  className,
}) => {
  const handleDownload = () => {
    const blob = new Blob([fileContent], { type: fileType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    // Clean up the URL object after download
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className={`${className} flex items-center gap-x-3 text-sm text-slate-400 py-2.5 px-5 border rounded-[100px] bg-transparent`}
    >
      <FileIcon />
      Download {fileName}
    </button>
  );
};

export default DownloadButton;
