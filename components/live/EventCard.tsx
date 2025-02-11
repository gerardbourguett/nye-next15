import React from "react";
import { Globe, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EventCard = ({
  event,
}: {
  event: {
    gmt_offset: number;
    country_name: string;
    country_code: string;
    city?: string;
    stream?: string;
  };
}) => {
  const gmtOffset = `GMT${event.gmt_offset >= 0 ? "+" : ""}${
    event.gmt_offset / 3600
  }`;

  return (
    <Card className="border-none bg-gradient-to-br from-zinc-100 to-zinc-100/50 dark:from-zinc-900/50 dark:to-zinc-900 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex items-center gap-4 p-4">
        <Image
          alt={`Flag of ${event.country_name}`}
          src={`/flags/1x1/${event.country_code.toLowerCase()}.svg`}
          className="rounded-full object-cover"
          width={48}
          height={48}
        />
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            {event.country_name}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Globe className="w-4 h-4" />
            <span>{gmtOffset}</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {event.city || "Capital City"}
          </span>
        </div>
      </CardContent>
      {event.stream && (
        <CardFooter className="p-4">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
          >
            <Link href={event.stream} target="_blank">
              Watch Live Stream
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EventCard;
