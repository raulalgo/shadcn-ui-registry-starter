import { GlobalNav } from "@/components/ui/global-nav";

export const globalNav = {
  name: "global-nav",
  components: {
    Default: <GlobalNav />,
    "Campaigns Selected": <GlobalNav selectedPage="campaigns" />,
    "Creative Management Selected": <GlobalNav selectedPage="creative" />,
    "Administration Selected": <GlobalNav selectedPage="administration" />,
    "Inventory Management Selected": <GlobalNav selectedPage="inventory" />,
    "Users Selected": <GlobalNav selectedPage="users" />,
  },
};
