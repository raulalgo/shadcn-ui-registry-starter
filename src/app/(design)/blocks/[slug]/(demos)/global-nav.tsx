import { GlobalNav } from "@/components/ui/global-nav";

export const globalNav = {
  name: "global-nav",
  components: {
    Default: <GlobalNav />,
    "Search Selected": <GlobalNav selectedPage="search" />,
    "Settings Selected": <GlobalNav selectedPage="settings" />,
    "Profile Selected": <GlobalNav selectedPage="profile" />,
  },
}; 