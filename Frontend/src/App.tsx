import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Collections from "./Components/Collections";
import Exhibitions from "./Components/Exhibitions";
import { getExhibitionsFromLocalStorage } from "./utils/exhibitionStorage";
import ExhibitionCard from "./Components/ExhibitionCard";
import ArtList from "./Components/ArtList";
import ChicagoArtList from "./Components/ChicagoArtList";

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
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path={"/clevelandmuseum"} element={<ArtList />} />
        <Route path={"/artwork/:artId"} element={<Collections />} />
        <Route path={"chichagoart"} element={<ChicagoArtList />} />
        {exhibitions.map((exhibition, index) => (
          <Route
            key={index}
            path={exhibition.path}
            element={<ExhibitionCard />}
          />
        ))}
      </Routes>
    </>
  );
};

export default App;
