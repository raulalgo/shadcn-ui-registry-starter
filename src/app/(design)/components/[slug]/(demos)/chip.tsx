import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Smile, CheckCircle2, XCircle } from "lucide-react";
import { Chip } from "@/components/ui/chip";

export const chip = {
  name: "chip",
  components: {
      Exclude: <Chip>Include Chip</Chip>,
    Default: <Chip label="label" variant="exclude">Exclude Chip</Chip>,
    WithIcon: <Chip><Smile className="mr-1" />Chip with Icon</Chip>,
  },
};