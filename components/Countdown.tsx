"use client";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const MotionNumberFlow = motion.create(NumberFlow);

const Countdown = () => {
  const [now, setNow] = useState(() => Date.now());
  const year = useMemo(() => new Date().getFullYear(), []);
  const targetDate = useMemo(
    () => new Date(`January 1, ${year + 1} 00:00:00`).getTime(),
    [year]
  );

  const timeLeft = useMemo(() => {
    const gap = targetDate - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    return {
      days: Math.max(0, Math.floor(gap / day)),
      hours: Math.max(0, Math.floor((gap % day) / hour)),
      minutes: Math.max(0, Math.floor((gap % hour) / minute)),
      seconds: Math.max(0, Math.floor((gap % minute) / second)),
    };
  }, [now, targetDate]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = useMemo(
    () => ["days", "hours", "minutes", "seconds"] as const,
    []
  );

  return (
    <NumberFlowGroup>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 w-full max-w-5xl">
        {timeUnits.map((unit) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            key={unit}
            className="flex flex-col items-center justify-center space-y-3"
            layout
          >
            <MotionNumberFlow
              value={timeLeft[unit]}
              format={{ minimumIntegerDigits: 2 }}
<<<<<<< HEAD
              className="text-5xl font-bold text-blue-700 dark:text-blue-400 animate-pulse"
=======
              className="text-5xl font-bold text-blue-600 dark:text-blue-400"
>>>>>>> aaa2038ed0a7654623248e8535a4bf7cd29ff310
              layout
            />
            <span className="text-lg text-gray-500 dark:text-gray-400">
              {unit.toUpperCase()}
            </span>
          </motion.div>
        ))}
      </div>
    </NumberFlowGroup>
  );
};

export default Countdown;
