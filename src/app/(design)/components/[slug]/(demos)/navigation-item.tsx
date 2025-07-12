import { NavigationItem } from "@/components/ui/navigation-item";

export const navigationItem = {
  name: "navigation-item",
  components: {
    Default: <NavigationItem label="Home" />,
    Selected: <NavigationItem label="Home" isSelected={true} />,
    "Search Item": <NavigationItem label="Search" />,
    "Settings Item": <NavigationItem label="Settings" isSelected={true} />,
    "Profile Item": <NavigationItem label="Profile" />,
    "No Icon": <NavigationItem label="No Icon" />,
  },
}; 