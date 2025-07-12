import { NavigationItem } from "@/components/ui/navigation-item";
import { Home, Search, Settings, User } from "lucide-react";

export const navigationItem = {
  name: "navigation-item",
  components: {
    Default: <NavigationItem icon={Home} label="Home" />,
    Selected: <NavigationItem icon={Home} label="Home" isSelected={true} />,
    "Search Item": <NavigationItem icon={Search} label="Search" />,
    "Settings Item": <NavigationItem icon={Settings} label="Settings" isSelected={true} />,
    "Profile Item": <NavigationItem icon={User} label="Profile" />,
  },
}; 