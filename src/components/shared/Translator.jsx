import { Suspense } from "react";
import Translate from "./Translate";

export default function Translator({ text }) {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
      <Translate text={text} />
    </Suspense>
  );
}
