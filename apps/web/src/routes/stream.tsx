import { createFileRoute } from "@tanstack/react-router";
import {
  Mic,
  MicOff,
  Send,
  Settings,
  Share2,
  Video,
  VideoOff,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/stream")({
  component: StreamComponent,
});

function StreamComponent() {
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState([
    { user: "System", text: "Welcome to your stream chat!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { user: "Broadcaster", text: newMessage }]);
    setNewMessage("");
  };

  const toggleLive = () => {
    setIsLive(!isLive);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
      <div className="lg:col-span-3 bg-black p-4 flex flex-col">
        <div className="flex-1 bg-zinc-900 rounded-3xl flex items-center justify-center relative overflow-hidden border border-zinc-800">
          <div className="text-zinc-500 flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
              {isVideoOff ? (
                <VideoOff className="w-10 h-10" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-zinc-700 animate-pulse" />
              )}
            </div>
            <p className="text-xl font-medium">
              {isLive ? "You are Live" : "Preview Mode"}
            </p>
            <p className="text-sm">{isLive ? "00:12:45" : "Ready to stream"}</p>
          </div>

          {isLive && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
              LIVE
            </div>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-950/80 backdrop-blur-sm p-2 rounded-full border border-zinc-800">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-colors ${
                isMuted
                  ? "bg-red-500/20 text-red-500"
                  : "hover:bg-zinc-800 text-zinc-50"
              }`}
            >
              {isMuted ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-full transition-colors ${
                isVideoOff
                  ? "bg-red-500/20 text-red-500"
                  : "hover:bg-zinc-800 text-zinc-50"
              }`}
            >
              {isVideoOff ? (
                <VideoOff className="w-5 h-5" />
              ) : (
                <Video className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={toggleLive}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                isLive
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-zinc-50 hover:bg-zinc-200 text-zinc-950"
              }`}
            >
              {isLive ? "End Stream" : "Go Live"}
            </button>

            <button className="p-3 rounded-full hover:bg-zinc-800 text-zinc-50 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium text-zinc-400">
              My Awesome Stream
            </h1>
          </div>
          <div className="flex gap-4 text-sm font-medium">
            <div className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">
              <span className="text-zinc-400">Viewers:</span>
              <span className="ml-2 text-zinc-50">
                {isLive ? "1,234" : "0"}
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsShareOpen(!isShareOpen)}
                className="bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-full border border-zinc-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-50">Share</span>
              </button>
              {isShareOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl z-50">
                  <h3 className="text-zinc-50 font-medium mb-3">
                    Share Stream
                  </h3>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={window.location.origin + "/live/demo-stream"}
                      className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-400 flex-1 outline-none"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          window.location.origin + "/live/demo-stream",
                        );
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="bg-zinc-50 text-zinc-950 text-xs font-bold px-3 py-2 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 border-l border-zinc-800 bg-zinc-950 flex flex-col">
        <div className="p-4 border-b border-zinc-800 font-semibold flex justify-between items-center">
          <span>Stream Chat</span>
          <span className="text-xs bg-zinc-900 px-2 py-1 rounded-full text-zinc-400">
            Slow Mode
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className="text-sm">
              <span
                className={`font-bold ${
                  msg.user === "Broadcaster" ? "text-red-400" : "text-zinc-50"
                }`}
              >
                {msg.user}:{" "}
              </span>
              <span className="text-zinc-300">{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-zinc-800">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Send a message..."
              className="flex h-9 w-full rounded-full border border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 bg-zinc-50 text-zinc-900 shadow hover:bg-zinc-200 h-9 w-9"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
