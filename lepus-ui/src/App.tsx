import reactLogo from './assets/react.svg'
import './App.css'
import DailyVolumeLeaderBoard from './components/DailyVolumeLeaderBoard'
import TotalTransferLeaderBoad from './components/TotalTransferLeaderBoard'

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>On-chain Identity Scoring Leader Board</h1>
      <hr
        style={{
          background: "#FFFFFF",
          height: "2px",
          border: "none",
        }}
      />
      <hr
        style={{
          background: "#FFFFFF",
          height: "2px",
          border: "none",
        }}
      />
      <h1>Daily Volume Leader Board</h1>
      <DailyVolumeLeaderBoard />

      <hr
        style={{
          background: "#FFFFFF",
          height: "2px",
          border: "none",
        }}
      />
      <h1>Total Transfer Leader Board</h1>
      <TotalTransferLeaderBoad />
    </div>
  )
}

export default App
