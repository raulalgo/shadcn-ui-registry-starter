import { Button } from "@/components/ui/button";

export const button = {
  name: "button",
  components: {
    Primary: <Button variant="primary">Primary</Button>,
    Secondary: <Button variant="default">Secondary</Button>,
    Medium: <Button variant="medium">Medium</Button>,
    Ghost: <Button variant="ghost">Ghost</Button>,
    // Outline: <Button variant="outline">Outline</Button>,
  },
};
