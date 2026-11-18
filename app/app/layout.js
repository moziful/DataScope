import Sidebar from "@/components/app/Sidebar";
import TopHeader from "@/components/app/TopHeader";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Enterprise Multi-Role Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
