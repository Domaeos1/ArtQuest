import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Collections from "./Components/Collections";
import Exhibitions from "./Components/Exhibitions";
import { getExhibitionsFromLocalStorage } from "./utils/exhibitionStorage";

interface Exhibition {
  name: string;
  path: string;
}

const App: React.FC = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(
    getExhibitionsFromLocalStorage()
  );
  return (
    <>
      <NavBar setExhibitions={setExhibitions} exhibitions={exhibitions} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        {exhibitions.map((exhibition, index) => (
          <Route key={index} path={exhibition.path} element={<Exhibitions />} />
        ))}
      </Routes>
    </>
  );
};

export default App;
