import styled from "styled-components";
import WaveCanvas from "./canvases/wave/WaveCanvas";

export default function App() {
  return (
    <Container>
      <WaveCanvas />
    </Container>
  );
}

const Container = styled.div`
  width: 500px;
  height: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;
