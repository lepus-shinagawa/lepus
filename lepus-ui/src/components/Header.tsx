import { Burger, Button, Container, Group, Header } from "@mantine/core";
import { useToggle } from "@mantine/hooks";

function retHeader() {
  const [tf, setTf] = useToggle([false, true]);
  function onClick() {
    setTf();
  }
  return (
    // <Header height={50} sx={{ borderBottom: 0 }} mb={120} style={{"backgroundImage":`url(${MoonPicture})`}} >
    <Header height={100} sx={{ borderBottom: 0 }} mb={120} style={{ "backgroundColor": "#000000" }}>
      <Container style={{ "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" }} >
        <Group>
          <Burger opened={tf} onClick={onClick} size="sm" color="white" />
          <img src="../pictures/rabiticon.png" height={70} />
          <div style={{ "color": "#FFFACD" }}>Lepus Scoring</div>
        </Group>
        <Button className="rightOption" radius="xl" sx={{ height: 30 }}>
          About Team Lepus
        </Button>
      </Container>
    </Header>
  );
}
export default retHeader;
