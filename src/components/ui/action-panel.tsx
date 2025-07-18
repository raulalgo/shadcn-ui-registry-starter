import * as React from "react";
import { Card } from "./card";

export type ActionPanelProps = React.ComponentProps<"div">;

export function ActionPanel({ children, ...props }: ActionPanelProps) {
  return <Card {...props}>{children}</Card>;
} 