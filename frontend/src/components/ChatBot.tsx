import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  ChatContainer,
  ChatHeader,
  MascotContainer,
  MessagesContainer,
  Message,
  UserMessage,
  BotMessage,
  InputContainer,
  InputField,
  SendButton
} from "./styles/ChatBot.styles";
import ChatHeaderAnimated from "./ChatHeaderAnimated";
import ChatInputAnimated from "./ChatInputAnimated";

const ChatBot: React.FC = () => {

  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "Olá! me chamo galileu, como posso te ajudar?", sender: "bot" } // 🔹 O mascote já começa falando
  ]);
  const [input, setInput] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [mascotTalking, setMascotTalking] = useState(true);
  const [mascotFrame, setMascotFrame] = useState(0);
  const [messageWidths, setMessageWidths] = useState<{ [key: number]: number }>({});

  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!measureRef.current) return; // 🔹 Sai da função se measureRef.current for null
  
    const index = messages.length - 1;
    setMessageWidths((prev) => ({
      ...prev,
      [index]: measureRef.current!.offsetWidth, // 🔹 Use "!" para garantir que não seja null
    }));
  }, [messages]);
  
  useEffect(() => {
    if (mascotTalking) {
      const interval = setInterval(() => {
        setMascotFrame((prev) => (prev + 1) % 4);
      }, 300);

      // 🔹 O mascote para de falar depois de 1.5s
      const stopTalkingTimeout = setTimeout(() => {
        setMascotTalking(false);
        setMascotFrame(0);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(stopTalkingTimeout);
      };
    }
  }, [mascotTalking]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    if (!hasTyped) setHasTyped(true);

    const userMessage = { text: input, sender: "user" as "user" | "bot" }; // 🔹 Garantindo que sender seja um dos tipos permitidos

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

     // Inicia a animação do mascote
     setMascotTalking(true);

     // Adiciona uma mensagem vazia do bot para preenchermos com a resposta
     setMessages((prev) => [...prev, { text: "", sender: "bot" }]);
 
     try {
       const response = await axios.post("/chat", { message: currentInput });
       const botResponseText: string = response.data.response;
       
       let i = 0;
       const interval = setInterval(() => {
         setMessages((prev) => {
           const newMessages = [...prev];
           const lastIndex = newMessages.length - 1;
           if (newMessages[lastIndex].sender === "bot") {
             newMessages[lastIndex] = {
               ...newMessages[lastIndex],
               text: botResponseText.slice(0, i + 1),
             };
           }
           return newMessages;
         });
         i++;
         if (i >= botResponseText.length) {
           clearInterval(interval);
           setTimeout(() => {
             setMascotTalking(false);
             setMascotFrame(0);
           }, 500);
         }
       }, 30);
     } catch (error) {
       console.error("Erro ao enviar mensagem para o backend:", error);
       // Em caso de erro, atualize a mensagem do bot com uma mensagem de erro
       setMessages((prev) => {
         const newMessages = [...prev];
         newMessages[newMessages.length - 1] = {
           ...newMessages[newMessages.length - 1],
           text: "Desculpe, ocorreu um erro ao processar sua mensagem.",
         };
         return newMessages;
       });
       setMascotTalking(false);
  };
  }

  // const handleCloseChat = () => {
  //   onFinish(); // 🔹 Fecha o chat chamando setShowChat(false) do MainScreen
  // };
  

  const getMascotImage = () => {
    if (mascotFrame === 1) return "/assets/mascot-t1.svg";
    if (mascotFrame === 2) return "/assets/mascot-t2.svg";
    if (mascotFrame === 3) return "/assets/mascot-t1.svg";
    return "/assets/mascot.svg";
  };

  return (
    <ChatContainer>
      <ChatHeader hasTyped={hasTyped}>
        <ChatHeaderAnimated show={hasTyped} />
      </ChatHeader>

      <MascotContainer firstAppearance={false}>
        <img src={getMascotImage()} alt="Mascote" width="100" height="100" />
      </MascotContainer>


      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.sender === "user"}>
            {msg.sender === "user" ? (
              <UserMessage>{msg.text}</UserMessage>
            ) : (
              <BotMessage
  style={{
    minWidth: messageWidths[index] ? `${messageWidths[index]}px` : "auto",
    opacity: msg.text.length > 0 ? 1 : 0, // 🔹 Esconde até a animação começar
  }}
  ref={index === messages.length - 1 ? measureRef : null}
>
  {msg.text}
</BotMessage>
            )}
          </Message>
        ))}
      </MessagesContainer>

      <ChatInputAnimated
        input={input}
        setInput={setInput}
        onSend={handleSendMessage}
        setHasTyped={setHasTyped}
      />
    </ChatContainer>
  );
};

export default ChatBot;
