"use client";

import Sidebar from "@/components/admin/Sidebar";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

 async function checkUser() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/admin/login");
      return;
    }

    setLoading(false);
  } catch (error) {
    console.error(error);
    router.push("/admin/login");
  }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  // Don't protect login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#C8A97E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-white text-lg">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-[#111111] flex flex-col md:flex-row">

    <Sidebar />

    <main className="flex-1 p-4 md:p-8 overflow-x-hidden">

      <div className="flex justify-end mb-6 md:mb-8">

        <button
          onClick={logout}
          className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-4
            md:px-5
            py-2
            md:py-3
            rounded-xl
            transition
          "
        >
          Logout
        </button>

      </div>

      {children}

    </main>

  </div>
);
}