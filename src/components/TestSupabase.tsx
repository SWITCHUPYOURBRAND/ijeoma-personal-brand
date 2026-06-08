"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TestSupabase() {
  useEffect(() => {
    async function test() {
      console.log("Supabase Connected:", supabase);
    }

    test();
  }, []);

  return null;
}