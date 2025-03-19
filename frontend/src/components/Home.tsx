import React, { useState } from "react";
import { Container, LeftBlock, RightBlock, AnimatedButton, AlignedText } from "./styles/Home.styles";
import ColorGrid from "./ColorGrid";
import TitleAnimation from "./TitleAnimation";
import SloganAnimation from "./SloganAnimation";
import TransitionScreen from "./TransitionScreen"; // 🔹 Importa a nova tela intermediária

const Home: React.FC = () => {
  const [startTransition, setStartTransition] = useState(false);

  const handleStartCourse = () => {
    setStartTransition(true);
  };

  return (
    <>
      {/* 🔹 O conteúdo inicial só aparece enquanto `startTransition` for falso */}
      {!startTransition && (
        <Container>
          <LeftBlock>
            <AlignedText>
              <TitleAnimation text="Polimat[ia]" delay={100} />
            </AlignedText>
            <AlignedText>
              <SloganAnimation />
            </AlignedText>
            <AnimatedButton onClick={handleStartCourse}>
              Acessar bot
            </AnimatedButton>
          </LeftBlock>
          <RightBlock>
            <ColorGrid />
          </RightBlock>
        </Container>
      )}

      {/* 🔹 Após o clique, carrega `TransitionScreen`, que depois manda para `MainScreen` */}
      {startTransition && <TransitionScreen />}
    </>
  );
};

export default Home;
