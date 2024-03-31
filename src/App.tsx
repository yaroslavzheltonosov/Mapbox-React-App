import {  createContext, useState } from "react";
import Mapbox from "./components/Mapbox/Mapbox";
import { PolygonContextT, PolygonStorage } from "./utils/types";

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