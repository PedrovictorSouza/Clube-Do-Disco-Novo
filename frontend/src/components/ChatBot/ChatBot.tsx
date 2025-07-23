import React, { useState, useEffect, useRef } from "react";
import ChatBotShaderStars from "./ChatBotShaderStars";
import ChatBotShaderWave from "./ChatBotShaderWave";
import axios from "axios";
import {
  ChatContainer,
  ChatHeader,
  MessagesContainer,
  Message,
  UserMessage,
  BotMessage,
  InputContainer,
  InputField,
  SendButton
} from "../styles/ChatBot.styles";
import ChatHeaderAnimated from "./ChatHeaderAnimated";
import ChatInputAnimated from "./ChatInputAnimated";

const ChatBot: React.FC = () => {

  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "As várias frequencias não nomeadas. Ja parou para pensar que seu disco favorito pode ter camadas ainda não acessadas e ser ainda mais incrível? Não é necessário LSD para atingir essa lissergia, mas atenção as nuances, as entrelinhas e os semitons. Acessar isso, conectando-se com um coletivo que, por uma janela de momento, compartilha-rá da mesma frequencia. Troca de figurinhas, quem sabe você traz algo incrível a mesa? estamos de braços abertos, vem ouvir um som.", sender: "bot" } // 🔹 O mascote já começa falando
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
  

  // const getMascotImage = () => {
  //   if (mascotFrame === 1) return "/assets/mascot-t1.svg";
  //   if (mascotFrame === 2) return "/assets/mascot-t2.svg";
  //   if (mascotFrame === 3) return "/assets/mascot-t1.svg";
  //   return "/assets/mascot.svg";
  // };

  // Shader animation loop and dynamic sizing
  const [shaderFrame, setShaderFrame] = useState(0);
  const [shaderSize, setShaderSize] = useState({ width: 420, height: 420 });
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setShaderFrame((f) => f + 1);
      if (containerRef.current) {
        setShaderSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }, 600); // update every 600ms
    return () => clearInterval(interval);
  }, []);

  return (
    <ChatContainer ref={containerRef} style={{ position: "relative", overflow: "hidden" }}>
      {/* Wave Canvas - above stars, covers entire area */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
        <ChatBotShaderWave width={shaderSize.width} height={shaderSize.height} color="#ffe600" amplitude={32} frequency={2} speed={0.02} />
      </div>
      {/* Stars Canvas - always behind, covers entire area */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
        <ChatBotShaderStars width={shaderSize.width} height={shaderSize.height} numStars={120} />
      </div>

      <ChatHeader hasTyped={hasTyped}>
        <ChatHeaderAnimated show={hasTyped} />
      </ChatHeader>

      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.sender === "user"}>
            {msg.sender === "user" ? (
              <UserMessage>{msg.text}</UserMessage>
            ) : (
              <BotMessage
                style={{
                  minWidth: messageWidths[index] ? `${messageWidths[index]}px` : "auto",
                  opacity: msg.text.length > 0 ? 1 : 0,
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
