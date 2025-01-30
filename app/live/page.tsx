/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import NyeEvents from "@/components/live/NyeEvents";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Footer from "@/components/Footer";

const Page = () => {
  const supabase = createClient();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("timezones")
        .select("*")
        .is("active", true);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setEvents(data);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [supabase]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mt-4 w-full max-w-4xl">
        <NyeEvents events={events} />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
