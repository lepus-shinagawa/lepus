import '../App.css'
import RabitPicture from '../pictures/rabitpicture.png'
import EarthPicture from '../pictures/earth.jpg'
import SpacePicture from '../pictures/SpacePicture.jpg'
import Header from '../components/Header'
import Card from '../components/Card'
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
        <div className='introText' style={{"flexDirection":"column"}}>
          <Text style={{"fontSize":50, "fontFamily":"cursive"}}>Welcome!</Text>
          <Text style={{"fontSize":30, "fontFamily":"cursive"}}>to</Text>
          <Text style={{"fontSize":50, "fontFamily":"cursive"}}>Lepus Scoring</Text>
        </div>
      </div>
      <Card image={EarthPicture}  title="Daily Volume Leader Board" link='/DailyVolume'
        description='You can check the lanking of daily transaction amount here!'
        rating="New Arrival!" author={author_info}/>
      <Card image={SpacePicture}  title="Total Transfer Leader Board" link='/TotalTransfer'
        description='You can check the lanking of the transaction frequency here!'
        rating="Most Majour!" author={author_info}/>
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
      
      
    </div>
  )
}
export default App