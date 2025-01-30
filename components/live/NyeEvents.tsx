"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SocialShare from "../SocialShare";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import EventCard from "./EventCard";

interface Event {
  id: number;
  country_code: string;
  country_name: string;
  zone_name: string;
  gmt_offset: number;
  city: string;
  active: boolean;
  stream: string;
  svg_path: string;
  location: string;
  lat: number;
  lng: number;
}

interface Props {
  events: Event[];
}

const TimeDisplay = ({ value, label }: { value: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center bg-gradient-to-br dark:from-zinc-900 to-zinc-800 p-4 rounded-xl shadow-lg"
  >
    <span className="font-mono text-4xl font-bold dark:text-white text-blue-500">
      {value}
    </span>
    <span className="text-xs dark:text-zinc-400 text-zinc-600 mt-1 uppercase tracking-wide">
      {label}
    </span>
  </motion.div>
);

const NyeEvents = ({ events }: Props) => {
  const [timeSegments, setTimeSegments] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    date: "",
    time: "",
    timezone: "",
  });
  const [closest, setClosest] = useState<Event[]>([]);
  const [, setNextGroup] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterData = async () => {
      const currentUTC = new Date();
      const currentTimestamp = Math.floor(currentUTC.getTime() / 1000);

      const sortedData = events
        .map((row) => {
          const localTimestamp = currentTimestamp + row.gmt_offset;
          const localDate = new Date(localTimestamp * 1000);
          let secondsToTarget =
            24 * 3600 -
            (localDate.getUTCHours() * 3600 +
              localDate.getUTCMinutes() * 60 +
              localDate.getUTCSeconds());

          if (secondsToTarget === 24 * 3600) secondsToTarget = 0;

          return { ...row, secondsToTarget, localTime: localDate };
        })
        .sort((a, b) => a.secondsToTarget - b.secondsToTarget);

      setClosest(
        sortedData.filter(
          (row) => row.secondsToTarget === sortedData[0].secondsToTarget
        )
      );
      setNextGroup(
        sortedData.filter(
          (row) => row.secondsToTarget > sortedData[0].secondsToTarget
        )
      );
      const now = new Date();
      setTimeSegments({
        date: now.toLocaleDateString(),
        hours: now.getHours().toString().padStart(2, "0"),
        minutes: now.getMinutes().toString().padStart(2, "0"),
        seconds: now.getSeconds().toString().padStart(2, "0"),
        time: now.toLocaleTimeString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      setLoading(false);
    };

    fetchAndFilterData();
    const interval = setInterval(fetchAndFilterData, 1000);
    return () => clearInterval(interval);
  }, [events]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      <SocialShare
        url="https://nye.today/live"
        title="Follow the New Year celebrations as they happen across different time zones #chao2024 #nye2025 #2025Live"
      />
      <Card className="p-8">
        <CardHeader className="text-center space-y-6">
          <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Midnights Around the World
          </CardTitle>
          <CardDescription className="dark:text-zinc-400 text-zinc-600 max-w-2xl mx-auto">
            Follow the New Year celebrations as they happen across different
            time zones
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <TimeDisplay value={timeSegments.date} label="" />
          <div className="flex justify-center gap-4">
            <TimeDisplay value={timeSegments.hours} label="HOURS" />
            <TimeDisplay value={timeSegments.minutes} label="MINUTES" />
            <TimeDisplay value={timeSegments.seconds} label="SECONDS" />
          </div>
        </CardContent>
      </Card>

      <motion.section className="space-y-6">
        <h2 className="text-2xl font-semibold dark:text-white">
          Approaching Midnight
        </h2>
        <Progress value={40} className="w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {closest.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default NyeEvents;
