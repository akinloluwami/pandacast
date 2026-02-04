import { createFileRoute } from "@tanstack/react-router";
import { Send, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/live/$streamId")({
  component: LiveStreamComponent,
});

function LiveStreamComponent() {
  const { streamId } = Route.useParams();
  const [messages, setMessages] = useState([
    { user: "User1", text: "Hello!" },
    { user: "User2", text: "Is this live?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { user: "You", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-screen">
      {/* Main Content - Video Player */}
      <div className="lg:col-span-3 bg-black p-4 flex flex-col">
        <div className="flex-1 bg-zinc-900 rounded-3xl flex items-center justify-center relative overflow-hidden border border-zinc-800">
          <div className="text-zinc-500 flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center animate-pulse">
              <div className="w-20 h-20 rounded-full bg-zinc-700" />
            </div>
            <p className="text-xl font-medium">Stream Offline</p>
            <p className="text-sm">Waiting for stream {streamId}...</p>
          </div>
          <div className="absolute top-4 left-4 bg-zinc-50 text-zinc-950 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Live
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <h1 className="text-2xl font-bold">Live Stream: {streamId}</h1>
          <div className="flex items-center gap-2 text-zinc-400">
            <User className="w-4 h-4" />
            <span>1,234 watching</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 border-l border-zinc-800 bg-zinc-950 flex flex-col">
        <div className="p-4 border-b border-zinc-800 font-semibold">
          Live Chat
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className="text-sm">
              <span className="font-bold text-zinc-50">{msg.user}: </span>
              <span className="text-zinc-300">{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-zinc-800">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Say something..."
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
