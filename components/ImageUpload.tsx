"use client";

import { useCallback, useState  } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface IImageUploadProps {
  label: string;
  onChange: (base64: string) => void;
  value?: string;
  disabled?: boolean
}

const ImageUpload:React.FC<IImageUploadProps> = ({label, onChange, value, disabled}) => {
  const [base64, setBase64] = useState(value);
  const handleChange = useCallback((base64: string)=> {
    onChange(base64)
  }, [onChange]);

  const handleDrop = useCallback((files: any)=>{
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      setBase64(event.target.result);
      handleChange(event.target.result);
    }

    reader.readAsDataURL(file);

  }, [handleChange])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    }
  });

  return (
    <div {...getRootProps({
      className: "w-full p-4 border-2 border-dotted rounded-md border-gray-200 text-neutral-600 text-center"
    })}>
      <input {...getInputProps()} />
      {
        base64 ? (
          <div className="flex items-center justify-center">
            <Image src={base64} height="100" width="100" alt="Image" />
          </div>
        ) : (
          <p className="text-neutral-600">{label}</p>
        )
      }
    </div>
  );
}
 
export default ImageUpload;