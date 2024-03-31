import {  createContext, useState } from "react";
import Mapbox from "./Mapbox";
import { PolygonContextT, PolygonStorage } from "./types";

export const PolygonContext = createContext<PolygonContextT>({
  stateContext: [],
  setStateContext: () => {},
});

const App = () => {
  const [stateContext, setStateContext] = useState<PolygonStorage[]>([]);
  return (
    <PolygonContext.Provider value={{stateContext, setStateContext}}>
      <Mapbox/>
    </PolygonContext.Provider>
  );
};

export default App;