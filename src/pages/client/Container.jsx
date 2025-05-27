import { cn } from "../../lib/utils";

export default function Container({ children, className }) {
  return (
    <div className={cn("container mx-auto max-sm:px-4", className)}>
      {children}
    </div>
  );
}
