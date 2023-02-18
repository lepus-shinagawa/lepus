import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DailyVolumeLanking from "./pages/DailyVolume";
import TotalTransferLanking from "./pages/TotalTransfer";
import NFTForesightLanking from "./pages/NFTForesight";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/DailyVolume`} element={<DailyVolumeLanking />} />
        <Route path={`/TotalTransfer`} element={<TotalTransferLanking />} />
        <Route path={`/NFTForesight`} element={<NFTForesightLanking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
