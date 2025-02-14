import { Avatar } from "@mui/material";

const CustomOptions = ({ img, label, isAvatar = false, isIcon = false }) => {
  return (
    <div className="flex items-center space-x-2">
      {isAvatar && <Avatar src={img} sx={{ width: 24, height: 24 }} />}
      {isIcon && img}
      <span className="text-sm font-medium font-[Outfit]">{label}</span>
    </div>
  );
};

export default CustomOptions;
