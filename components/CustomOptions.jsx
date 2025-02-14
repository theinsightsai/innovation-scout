import { Avatar } from "@mui/material";
import { getPriorityIconById } from "@/utils";

const CustomOptions = ({ img, label, isAvatar = false, isIcon = false }) => {
  return (
    <div
      className="flex items-center space-x-2 "
      style={{ padding: "5px 5px" }}
    >
      {isAvatar && <Avatar src={img} sx={{ width: 24, height: 24 }} />}
      {isIcon && img}
      <span className="text-sm font-medium font-[Outfit]">{label}</span>
    </div>
  );
};

export default CustomOptions;

export const TASK_PRIORITY_MENU_OPTIONS = [
  {
    label: (
      <CustomOptions
        img={getPriorityIconById("highest")}
        label={"Highest"}
        isAvatar={false}
        isIcon={true}
      />
    ),
    value: "highest",
  },
  {
    label: (
      <CustomOptions
        img={getPriorityIconById("high")}
        label={"High"}
        isAvatar={false}
        isIcon={true}
      />
    ),
    value: "high",
  },
  {
    label: (
      <CustomOptions
        img={getPriorityIconById("medium")}
        label={"medium"}
        isAvatar={false}
        isIcon={true}
      />
    ),
    value: "medium",
  },
  {
    label: (
      <CustomOptions
        img={getPriorityIconById("low")}
        label={"Low"}
        isAvatar={false}
        isIcon={true}
      />
    ),
    value: "low",
  },
  {
    label: (
      <CustomOptions
        img={getPriorityIconById("lowest")}
        label={"Lowest"}
        isAvatar={false}
        isIcon={true}
      />
    ),
    value: "lowest",
  },
];
