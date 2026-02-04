import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Radio } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();

  const handleGoLive = () => {
    const streamId = Math.random().toString(36).substring(7);
    navigate({ to: "/live/$streamId", params: { streamId } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
          PandaCast
        </h1>
        <p className="text-xl text-zinc-400 max-w-[600px]">
          Free Anonymous Live Streaming
        </p>
      </div>

      <button
        onClick={handleGoLive}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 bg-zinc-50 text-zinc-900 shadow hover:bg-zinc-200 h-14 px-8 cursor-pointer"
      >
        <Radio className="w-6 h-6" />
        Go Live
      </button>
    </div>
  );
}
