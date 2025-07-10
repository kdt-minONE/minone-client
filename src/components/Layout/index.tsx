import { ReactNode } from "react";
import { Header } from "../Header";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};
