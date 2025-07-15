import React, { type ReactNode } from "react";

export default function MinimalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="">
      <div className="container">{children}</div>
    </main>
  );
}
