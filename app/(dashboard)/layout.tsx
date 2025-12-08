import { Sidebar } from "@/components/features/sidebar";
import { Header } from "@/components/features/header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 bg-background">{children}</main>
      </div>
    </div>
  );
}
