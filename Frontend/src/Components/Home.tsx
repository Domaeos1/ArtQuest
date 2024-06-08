import React from "react";
import { clearExhibitionsFromLocalStorage } from "../utils/exhibitionStorage";

export default function Home() {
  return (
    <div>
      <button onClick={() => clearExhibitionsFromLocalStorage()}>
        Reset Cache
      </button>
    </div>
  );
}
