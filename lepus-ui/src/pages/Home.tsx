import '../App.css'
import RabitPicture from '../pictures/rabitpicture.png'
import EarthPicture from '../pictures/earth.jpg'
import SpacePicture from '../pictures/SpacePicture.jpg'
import Header from '../components/Header'
import Card from '../components/Card'
import Footer, { FooterCenteredProps } from '../components/Footer'
import { Text } from '@mantine/core'

function App() {
  const author_info = {
    name: "Team Lepus",
    image: RabitPicture
  }
  const footerInfo = [{
    link: "https://github.com",
    label: "Lepus Team",
  }]
  return (
    <div className="App">
      <Header />
      <div>
        <img src={RabitPicture} alt='rabit picture' height={200} />
        <div className='introText' style={{ "flexDirection": "column" }}>
          <Text style={{ "fontSize": 50, "fontFamily": "cursive" }}>Welcome!</Text>
          <Text style={{ "fontSize": 30, "fontFamily": "cursive" }}>to</Text>
          <Text style={{ "fontSize": 50, "fontFamily": "cursive" }}>Lepus Scoring</Text>
        </div>
      </div>
      <h1 style={{ "color": "#00CCFF", "fontFamily": "fantasy" }}>On-chain Identity Scoring Leader Board</h1>
      <Card image={SpacePicture} title="NFT foresight Leader Board" link='/NFTForesight'
        description='You can check the lanking of the NFT foresight here!'
        rating="Most Majour!" author={author_info} />
      <Card image={EarthPicture} title="Staking Leader Board" link='/Staking'
        description='You can check the lanking of staking here!'
        rating="New Arrival!" author={author_info} />
      <Card image={EarthPicture} title="Staking Reward Leader Board" link='/StakingReward'
        description='You can check the lanking of staking reward here!'
        rating="New Arrival!" author={author_info} />
      <hr
        style={{
          background: "#FFFFFF",
          height: "2px",
          border: "none",
        }}
      />
      <Footer links={footerInfo} />
    </div>
  )
}
export default App