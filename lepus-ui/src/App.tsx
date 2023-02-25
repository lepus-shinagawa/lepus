import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DailyVolumeLanking from "./pages/DailyVolume";
import TotalTransferLanking from "./pages/TotalTransfer";
import NFTForesightLanking from "./pages/NFTForesight";
import StakingLeaderBoard from "./components/StakingLeaderBoard";
import StakingLanking from "./pages/Staking";
import StakingRewardLanking from "./pages/StakingReward";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/DailyVolume`} element={<DailyVolumeLanking />} />
        <Route path={`/TotalTransfer`} element={<TotalTransferLanking />} />
        <Route path={`/NFTForesight`} element={<NFTForesightLanking />} />
        <Route path={`/Staking`} element={<StakingLanking />} />
        <Route path={`/StakingReward`} element={<StakingRewardLanking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
