"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

import SocialShare from "./SocialShare";
import NumberFlow from "@number-flow/react";
import { motion, MotionConfig } from "motion/react";
import { CURRENT_YEAR } from "@/app/data/constants";

const MotionNumberFlow = motion.create(NumberFlow);

const AnimatedProgress = ({ value }: { value: number }) => (
  <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
    <motion.div
      className="h-full bg-blue-500"
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1 }}
    />
  </div>
);

const TimeProgress = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  const yearStart = useMemo(() => new Date(CURRENT_YEAR, 0, 1), []);
  const yearEnd = useMemo(() => new Date(CURRENT_YEAR + 1, 0, 1), []);

  const calculateProgress = useCallback(() => {
    const now = new Date();
    const totalYearTime = yearEnd.getTime() - yearStart.getTime();
    const elapsedTime = now.getTime() - yearStart.getTime();
    return (elapsedTime / totalYearTime) * 100;
  }, [yearStart, yearEnd]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateProgress());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateProgress]);

  return (
    <div>
      <div className="w-full">
        <AnimatedProgress value={timeLeft} />

        <p className="dark:text-gray-400 text-gray-600  mt-4 text-center text-xl">
          <MotionConfig
            transition={{
              layout: { duration: 0.9, bounce: 0, type: "spring" },
            }}
          >
            <motion.span
<<<<<<< HEAD
              className="inline-flex items-center px-[0.3em] text-2xl dark:text-white transition-colors duration-300"
=======
              className="inline-flex items-center px-[0.3em] text-2xl dark:text-white text-black transition-colors duration-300"
>>>>>>> aaa2038ed0a7654623248e8535a4bf7cd29ff310
              layout
              style={{ borderRadius: 999 }}
            >
              <MotionNumberFlow
                value={timeLeft}
                format={{
                  minimumFractionDigits: 5,
                  maximumFractionDigits: 5,
                }}
                className="font-semibold"
                style={
                  {
                    "--number-flow-char-height": "0.85em",
                    "--number-flow-mask-height": "0.3em",
                  } as React.CSSProperties
                }
                layout
                layoutRoot
              />
            </motion.span>
          </MotionConfig>
          % of {CURRENT_YEAR} is complete
        </p>
        <div className="mt-4">
          <div className="">
            <SocialShare
              url="https://nye.today"
              title={`The year ${CURRENT_YEAR} is ${timeLeft.toFixed(
                5
              )}% complete!. Check out the progress at`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeProgress;
