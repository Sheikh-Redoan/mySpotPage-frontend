import { cn } from "../../lib/utils";

export default function EventTag({ event }) {
  return (
    <span
      className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
        "bg-[#3E70DD]/10 text-[#3E70DD]": event.status === "Confirmed",
        "bg-[#3BA55C]/10 text-[#3BA55C]": event.status === "Completed",
        "bg-[#FC8B23]/10 text-[#FC8B23]": event.status === "Pending",
        "bg-[#ED4245]/10 text-[#ED4245]": event.status === "Cancelled",
        "bg-[#82868E]/10 text-[#82868E]": event.status === "Not-show",
      })}>
      {event.status}
    </span>
  );
}
