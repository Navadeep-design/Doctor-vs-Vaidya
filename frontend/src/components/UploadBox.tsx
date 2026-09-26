import { useState, useRef } from 'react';
import { UploadCloud, File, X, Image as ImageIcon } from 'lucide-react';

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  onClear: () => void;
  selectedFile: File | null;
}

export default function UploadBox({ onFileSelect, onClear, selectedFile }: UploadBoxProps) {
  const [isDragHover, setIsDragHover] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

  const validateAndSelectFile = (file: File) => {
    setErrorMsg('');
    if (!allowedTypes.includes(file.type)) {
      setErrorMsg('Unsupported file type. Please upload a JPG, PNG, or PDF.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File is too large. Maximum size is 10MB.');
      return;
    }
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragHover(true);
  };

  const handleDragLeave = () => {
    setIsDragHover(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragHover(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClear();
  };

  if (selectedFile) {
    const isImage = selectedFile.type.startsWith('image/');
    return (
      <div className="bg-white border-2 border-teal-500 rounded-xl p-6 flex flex-col sm:flex-row items-center shadow-sm">
        <div className="h-16 w-16 bg-teal-50 rounded-lg flex items-center justify-center shrink-0 mb-4 sm:mb-0 sm:mr-4">
          {isImage ? <ImageIcon className="h-8 w-8 text-teal-600" /> : <File className="h-8 w-8 text-teal-600" />}
        </div>
        <div className="flex-1 text-center sm:text-left truncate">
          <p className="text-gray-900 font-medium truncate">{selectedFile.name}</p>
          <p className="text-gray-500 text-sm mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}</p>
        </div>
        <button 
          onClick={handleClear}
          className="mt-4 sm:mt-0 ml-0 sm:ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          title="Remove file"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragHover ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50 bg-white'
        }`}
      >
        <UploadCloud className={`mx-auto h-12 w-12 mb-4 ${isDragHover ? 'text-teal-500' : 'text-gray-400'}`} />
        <p className="text-gray-700 font-medium text-lg">Click to browse or drag and drop here</p>
        <p className="text-gray-500 text-sm mt-2">Supports JPG, PNG, PDF up to 10MB</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleChange}
        />
      </div>
      {errorMsg && <p className="text-red-500 text-sm mt-2 text-center">{errorMsg}</p>}
    </div>
  );
}
