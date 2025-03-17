import styled, { keyframes } from "styled-components";


const typewriter = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2));
  backdrop-filter: blur(10px);
  padding: 20px;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
  display: flex;
  width: 60%;
  flex-direction: column;
`;

export const Message = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")}; /* 🔹 Usuário à direita, bot à esquerda */
  width: 100%; /* 🔹 Ocupa a largura total do MessagesContainer */
  margin-bottom: 5px;
`;



export const UserMessage = styled.div`
  color: white;
  padding: 10px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  font-family: "Arial", sans-serif;
  font-size: 16px;
  color: black;
  overflow-wrap: break-word; /* 🔹 Garante que palavras longas sejam quebradas */
  word-break: break-word; /* 🔹 Força quebra de palavras longas */
  white-space: normal;
`;

export const BotMessage = styled.div`
  color: black;
  padding: 10px;
  border-radius: 10px;
  font-family: 'Fraunces', serif;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  overflow-wrap: break-word; /* 🔹 Garante que palavras longas sejam quebradas */
  word-break: break-word; /* 🔹 Força quebra de palavras longas */
  white-space: normal; /* 🔹 Mantém a animação fluída */
  display: inline-block;

  animation: ${typewriter} 1.5s steps(40, end) forwards; /* 🔹 Faz o efeito de digitação */
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  color: black;
  width: 60%;
`;

export const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: black;
  outline: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const ChatHeader = styled.div<{ hasTyped: boolean }>`
  width: 100%; /* 🔹 Faz o título ocupar toda a largura do ChatContainer */
  text-align: left;
  color: grey;
  font-size: 18px;
  font-weight: bold;
  color: black;
  padding: 10px 0;
  height: 5vh;
  border-bottom: 1px solid grey; /* 🔹 Linha agora atravessa todo o ChatContainer */
  visibility: ${({ hasTyped }) => (hasTyped ? "visible" : "hidden")};

   @media (max-width: 768px) {    
    margin-top: 50px;
  }
`;

export const MascotContainer = styled.div<{ firstAppearance: boolean }>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 10px 100px;
  margin-top: 100px;

  ${({ firstAppearance }) =>
    firstAppearance &&
    `
      opacity: 0;
      animation: ${fadeIn} 1.5s ease-out forwards;
    `}
`;

export const SendButton = styled.button`
  background: #005c44;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 115, 230, 0.3);
  }
`;
