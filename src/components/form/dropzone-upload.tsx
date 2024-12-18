"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DropzoneUploadProps {
  onFileSelect: (file: File | null) => void;
  onImageDelete?: () => Promise<void>;
  className?: string;
  dropText?: string;
  dragActiveText?: string;
  previewAltText?: string;
  previewImageClassName?: string;
  initialPreview?: string | null;
}

export default function DropzoneUpload({
  onFileSelect,
  onImageDelete,
  className = "",
  dropText = "Cliquez ou glissez une image ici pour la télécharger.",
  dragActiveText = "Déposez l'image ici...",
  previewAltText = "Aperçu",
  previewImageClassName = "",
  initialPreview = null,
}: DropzoneUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialPreview
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const removeImage = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setPreviewImage(null);
      onFileSelect(null);

      if (onImageDelete) {
        await onImageDelete();
      }
    },
    [onFileSelect, onImageDelete, previewImage]
  );

  useEffect(() => {
    return () => {
      if (previewImage && !initialPreview) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage, initialPreview]);

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-6 transition-colors",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/25",
        className
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        {previewImage ? (
          <div className="relative">
            <Image
              src={previewImage}
              alt={previewAltText}
              className={cn(
                "rounded-full w-32 h-32 object-cover",
                previewImageClassName
              )}
              width={128}
              height={128}
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Upload className="h-12 w-12 text-muted-foreground" />
        )}
        <p className="text-sm text-muted-foreground">
          {isDragActive ? dragActiveText : dropText}
        </p>
        {!previewImage && (
          <Button variant="secondary" size="sm">
            Sélectionner un fichier
          </Button>
        )}
      </div>
    </div>
  );
}
