import clsx from "clsx";

export default function Container({ children, className }) {
  return (
    <div className={clsx("container mx-auto max-sm:px-4", className)}>
      {children}
    </div>
  );
}
