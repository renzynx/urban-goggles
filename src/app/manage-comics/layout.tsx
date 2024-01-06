import ManagerNavbar from "@/components/ManagerNavbar";
import { ReactNode } from "react";

export default function ManageComicsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section>
      <ManagerNavbar />
      {children}
    </section>
  );
}
