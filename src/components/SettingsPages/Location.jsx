import { useState } from "react";
import SoloLocation from "./SoloLocation";
import TeamLocation from "./TeamLocation";

const Location = () => {
  const [location] = useState("solos");
  return <div>{location === "solo" ? <SoloLocation /> : <TeamLocation />}</div>;
};

export default Location;
