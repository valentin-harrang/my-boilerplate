import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordToggleIconProps {
  isVisible: boolean;
}

const PasswordToggleIcon: React.FC<PasswordToggleIconProps> = ({
  isVisible,
}) => {
  return (
    <>
      {isVisible ? (
        <EyeOff className="h-4 w-4 text-gray-500" />
      ) : (
        <Eye className="h-4 w-4 text-gray-500" />
      )}
    </>
  );
};

export default PasswordToggleIcon;
