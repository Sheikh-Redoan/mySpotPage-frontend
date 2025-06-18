import { cn } from "../../lib/utils";

export default function EventTag({ event }) {
  return (
    <span
      className={cn(
        "px-2 py-1 rounded-full text-xs font-semibold w-fit max-lg:hidden",
        {
          "bg-[#3E70DD]/15 text-[#3E70DD]": event.status === "Confirmed",
          "bg-[#21C66E]/15 text-[#21C66E]": event.status === "Completed",
          "bg-[#FC8B23]/15 text-[#FC8B23]": event.status === "Pending",
          "bg-[#ED4245]/15 text-[#ED4245]": event.status === "Cancelled",
          "bg-[#82868E]/15 text-[#82868E]": event.status === "Not-show",
        }
      )}>
      {event.status}
    </span>
  );
}
