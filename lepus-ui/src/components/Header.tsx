import { Burger, Button, Center, Container, createStyles, Group, Header, Menu } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { useState } from "react";
import IconRabit from '../pictures/rabit_icon.png';
import MoonPicture from '../pictures/MoonTexture.jpeg';
import { padding, textAlign } from "@mui/system";
import { PaddingRounded } from "@mui/icons-material";

function retHeader() {
  const [tf, setTf] = useToggle([false, true]);
  function onClick() {
    setTf();
  }
  return (
    // <Header height={50} sx={{ borderBottom: 0 }} mb={120} style={{"backgroundImage":`url(${MoonPicture})`}} >
    <Header height={50} sx={{ borderBottom: 0 }} mb={120} style={{"backgroundColor":"#FFFACD"}}>
      <Container className="HeaderLine" >
        <Group>
          <Burger opened={tf} onClick={onClick} size="sm" />
          <img src={IconRabit} height={30} />
        </Group>
        <Group spacing={5} style={{"backgroundColor":"whitez"}}>
          LepusTeam
        </Group>
        <Button className="rightOption" radius="xl" sx={{ height: 30 }}>
          Get early access
        </Button>
      </Container>
    </Header>
  );
}
export default retHeader;