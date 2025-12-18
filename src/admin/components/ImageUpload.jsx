import { useState, useRef } from "react";
import { FiUpload, FiX, FiImage, FiLoader } from "react-icons/fi";
import api from "../api/axios";
import config from "../../config";

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  placeholder = "Enter image URL or upload",
  previewHeight = "h-40",
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError(
        "Invalid file type. Only JPEG, PNG, GIF, WebP and SVG are allowed."
      );
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size too large. Maximum 5MB allowed.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Construct full URL for the uploaded image
      const fullUrl = `${config.backendUrl}${response.data.url}`;

      onChange(fullUrl);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const clearImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      {/* URL Input + Upload Button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-emerald-500 transition-all disabled:opacity-50"
          title="Upload image"
        >
          {uploading ? (
            <FiLoader size={20} className="animate-spin" />
          ) : (
            <FiUpload size={20} />
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Drag & Drop Zone (shown when no image) */}
      {!value && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            dragActive
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-slate-700 hover:border-slate-600 hover:bg-slate-800/30"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className={`p-3 rounded-full ${
                dragActive ? "bg-emerald-500/20" : "bg-slate-800"
              }`}
            >
              <FiImage
                size={24}
                className={dragActive ? "text-emerald-400" : "text-slate-500"}
              />
            </div>
            <div>
              <p className="text-sm text-slate-400">
                {uploading
                  ? "Uploading..."
                  : "Drag & drop an image here, or click to select"}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                JPEG, PNG, GIF, WebP, SVG (max 5MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative group">
          <div
            className={`relative ${previewHeight} rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50`}
          >
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden w-full h-full items-center justify-center text-slate-500">
              <div className="text-center">
                <FiImage size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Failed to load image</p>
              </div>
            </div>
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
            title="Remove image"
          >
            <FiX size={16} />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-400 flex items-center gap-2">
          <FiX size={14} />
          {error}
        </p>
      )}
    </div>
  );
}
