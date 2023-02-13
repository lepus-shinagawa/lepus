import reactLogo from './assets/react.svg'
import './App.css'
import DailyVolumeLeaderBoard from './components/DailyVolumeLeaderBoard'
import TotalTransferLeaderBoad from './components/TotalTransferLeaderBoard'
import RabitPicture from './pictures/rabit_icon.png'
import EarthPicture from './pictures/earth.jpg'
import Header from './components/Header'
import Card from './components/Card'
import { Text } from '@mantine/core'


function App() {
  const author_info = {
    name:"Team Lepus",
    image: RabitPicture
  }
  return (
    <div className="App">
      <Header/>
      <div>
        <img src={RabitPicture} alt='rabit picture' height={200}/>
        <div className='introText'>
          <Text className='Bigtitle'>Welcome!</Text>
          <Text className='Smalltitle'>to</Text>
          <Text className='Bigtitle'>Lepus Scoring</Text>
        </div>
      </div>
      <Card image={EarthPicture}  title="On-chain Identity Scoring Leader Board" link='https://github.com'
        description='You can check the lanking of the transaction frequency here!'
        rating="New Arrival!" author={author_info}/>
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