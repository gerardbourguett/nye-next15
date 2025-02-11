import Countdown from "@/components/Countdown";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TimeProgress from "@/components/TimeProgress";

export default function Home() {
  return (
    <main className="min-h-screen w-full from-black via-zinc-900 to-black flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full space-y-12 sm:space-y-20">
        <Header />

        <div className="w-full max-w-lg sm:max-w-xl mx-auto">
          <TimeProgress />
        </div>
        <Countdown />
        <Footer />
      </div>
    </main>
  );
}
