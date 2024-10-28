import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Upload, Trash2, ExternalLink } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { cn } from '@/lib/utils';

interface CVSectionProps {
  cv: string | null;
  edit?: boolean;
  onUpload?: (url: string) => void;
  onRemove?: () => void;
  className?: string;
}

const CVSection: React.FC<CVSectionProps> = ({ 
  cv, 
  edit = false, 
  onUpload, 
  onRemove,
  className 
}) => {
  const handleUpload = (result: any) => {
    const uploadedURL = result.info.secure_url;
    onUpload?.(uploadedURL);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-semibold">CV</p>
      
      <div className="flex items-center gap-2">
        {cv ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              asChild
            >
              <a href={cv} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" />
                View CV
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>

            {edit && (
              <>
                <CldUploadButton
                  onUpload={handleUpload}
                  uploadPreset={process.env.NEXT_PUBLIC_Assets_UPLOAD_PRESET}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Update
                  </Button>
                </CldUploadButton>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-destructive hover:text-destructive"
                  onClick={onRemove}
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </>
            )}
          </>
        ) : edit ? (
          <CldUploadButton
            onUpload={handleUpload}
            uploadPreset={process.env.NEXT_PUBLIC_Assets_UPLOAD_PRESET}
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload CV
              <span className="text-xs text-muted-foreground ml-2">(PDF only)</span>
            </Button>
          </CldUploadButton>
        ) : (
          <p className="text-sm text-muted-foreground">No CV uploaded</p>
        )}
      </div>
    </div>
  );
};

export default CVSection;
