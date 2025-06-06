import React, { useEffect, useState } from "react";
import { InputContainer, InputField, SendButton } from "./styles/ChatBot.styles";

interface ChatInputAnimatedProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  setHasTyped: (value: boolean) => void;
}

const ChatInputAnimated: React.FC<ChatInputAnimatedProps> = ({ input, setInput, onSend, setHasTyped }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <InputContainer className={`transition-opacity duration-[1500ms] ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <InputField
        type="text"
        value={input}
        placeholder="Digite sua mensagem..."
        onChange={(e) => {
          setInput(e.target.value);
          if (e.target.value.length > 0) setHasTyped(true);
        }}
        onKeyPress={(e) => e.key === "Enter" && onSend()}
      />
      <SendButton onClick={onSend}>Enviar</SendButton>
    </InputContainer>
  );
};

export default ChatInputAnimated; 