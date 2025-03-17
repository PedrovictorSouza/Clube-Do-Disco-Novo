import styled from "styled-components";

export const Container = styled.div<{ isFadingOut?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  transition: opacity 0.5s;
  opacity: ${({ isFadingOut }) => (isFadingOut ? 0 : 1)};

  @media (max-width: 768px) {
    flex-direction: column; /* 🔹 Coloca os blocos um em cima do outro */
    align-items: center;
    justify-content: flex-start;
    height: auto;
    padding: 20px;
  }
`;

export const LeftBlock = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  color: black;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const RightBlock = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex: unset;
    width: 100%;
    margin-top: 20px; /* 🔹 Dá um espaçamento entre os blocos */
  
  }
`;


export const AlignedText = styled.div`
  margin-bottom: 20px;
`;

export const AnimatedButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background-color:rgb(18, 18, 18);
  border: none;
  color: white;
  width: 200px;
  border-radius: 0px;
  transition: background-color 0.5s;

  &:hover {
    background-color:rgb(255, 255, 255);
    font-weight: bold;
    color: black;
    border-bottom: 2px solid black;
  }

  @media (max-width: 768px) {
    width: 300px;
    font-size: 12pt;
    text-align: left;
  }
`;
