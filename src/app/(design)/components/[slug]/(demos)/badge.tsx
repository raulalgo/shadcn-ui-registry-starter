import { Badge } from "@/components/ui/badge";

export const badge = {
  name: "badge",
  components: {
    start: <Badge variant="include" label="Ciudad">Porto</Badge>,
    uno: <Badge variant="include">Aveiro</Badge>,
    dos: <Badge variant="exclude">Lisboa</Badge>
  },
};