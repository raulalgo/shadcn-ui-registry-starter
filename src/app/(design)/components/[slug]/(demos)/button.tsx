import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Smile, CheckCircle2, XCircle } from "lucide-react";

export const button = {
  name: "button",
  components: {
    Primary: <Button variant="primary">Primary</Button>,
    Secondary: <Button variant="default" rightIcon={<Smile />}>Secondary</Button>,
    Medium: <Button variant="medium" leftIcon={<ArrowLeft />} rightIcon={<ArrowRight />}>Medium</Button>,
    Ghost: <Button variant="ghost" leftIcon={<XCircle />}>Ghost</Button>,
    LeftIcon: <Button variant="primary" leftIcon={<ArrowLeft />}>Left Icon</Button>,
    RightIcon: <Button variant="primary" rightIcon={<ArrowRight />}>Right Icon</Button>,
    // Outline: <Button variant="outline">Outline</Button>,
    SizeDefault: <Button variant="primary" size="default">Default Size</Button>,
    SizeSmall: <Button variant="primary" size="sm">Small Size</Button>,
    SizeLarge: <Button variant="primary" size="lg">Large Size</Button>,
    SizeIcon: <Button variant="primary" size="icon" iconOnly leftIcon={<CheckCircle2 />} aria-label="Icon Button" />, 
    Destructive: <Button variant="destructive" leftIcon={<XCircle />}>Destructive</Button>,
  },
};
