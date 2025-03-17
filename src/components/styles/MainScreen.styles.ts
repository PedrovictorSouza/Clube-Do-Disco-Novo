import styled, { keyframes } from "styled-components";


const liquidGradient = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 100%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 0%; }
  100% { background-position: 0% 50%; }
`;

// Animações
export const slideInMain = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

// const slideOutSidebar = keyframes`
//   from {
//     transform: translateX(0);
//   }
//   to {
//     transform: translateX(-100%);
//   }
// `;


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// const slideInSidebar = keyframes`
//   from {
//     transform: translateX(-100%);
//   }
//   to {
//     transform: translateX(0);
//   }
// `;

// Estilos
 export const CourseContainer = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;

// Sidebar fixo
export const Sidebar = styled.div<{ $isOpen: boolean }>`
  width: 20vw;
  height: 100vh;
  position: fixed;
  padding-top: 50px;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding-left: 20px;

  // 🔥 Gradiente fluido com efeito líquido (continua rodando)
  background: radial-gradient(circle, #ea4a19, #f1891d, #2d97d5, #f6b5be);
  background-size: 300% 300%;
  animation: ${liquidGradient} 15s ease-in-out infinite;  // 🔥 Mantém o efeito líquido

  // 🎯 Animação de entrada e saída do sidebar
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
  transition: transform 0.8s ease-out;

  h2 {
    color: #FFD700;
    font-weight: bold;
  }

  @media (max-width: 768px) {    
    width: 60vw;
    position: absolute;
    z-index: 100;
  }
`;


export const ModuleList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-top: 10px;
`;

export const ModuleItem = styled.div<{ $isActive: boolean; delay?: number }>`
padding: 10px;
margin-bottom: 10px;
color: ${({ $isActive }) => ($isActive ? "black" : "white")};
font-weight: ${({ $isActive }) => ($isActive ? "bold" : "thin")};
border-bottom: ${({ $isActive }) => ($isActive ? "1px solid black" : "none")};

padding-left: 20px;
cursor: pointer;
transition: background 0.3s, transform 0.3s;
font-weight: bold;

opacity: 0;  // Mantém invisível até a animação começar
animation: ${fadeIn} 0.5s ease-out forwards;
animation-delay: ${({ delay = 0 }) => `${delay}ms`}; // Define o atraso para cada item

&:hover {
  
  transform: scale(1.05);
}

@media (max-width: 768px) {    
    font-size: 10pt;
  }
`;


// Seção do topo branco
export const TopSection = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 0;
  background-image: url('/assets/Customization-bg.png'); // Substitua pelo caminho da sua imagem
  background-size: cover;       // Ajusta a imagem para cobrir toda a área
  background-position: center;  // Centraliza a imagem
  background-repeat: no-repeat; // Evita repetição
`;


export const MainContent = styled.div`
  padding: 30px;
  background-color: rgb(39, 62, 90);

  h3 {
    margin-left: 0px;
  }
  
  h2 {
    margin-left: 0px;
  }
`;

export const ContentWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  flex: 1;
  min-height: 100vh;
  overflow-y: visible;
  
  @media (min-width: 769px) {    
    margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "20vw" : "0")};
    transition: margin-left 0.3s ease-in-out;
  }
`;



export const HamburgerButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background: none;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1001;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background: none;
  color: white;
  border: 2px solid white; // Um pouco acima do outro botão para evitar conflitos
`;



// Mantendo suas margens e ajustes
export const ModuleTitle = styled.h2`
  font-size: 56px;
  margin-bottom: 20px;
  margin-left: 100px;
  padding-bottom: 5px;
  white-space: pre-line;
  line-height: 1.2;
  font-weight: 500;
`;

export const ModuleDescription = styled.p`
  margin-bottom: 30px;
  font-size: 18px;
  margin-left: 200px;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-style: italic;
  line-height: 1.6;
  white-space: pre-line;
`;

export const FullWidthImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 30px;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const LessonContainer = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  color: white;
`;

export const LessonTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 10px;
  color: white;
`;

export const SideBySideContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
`;

export const ContentColumn = styled.div`
  flex: 1;
  padding: 20px;
`;

export const LessonContent = styled.div`
  color: #fff;
  line-height: 1.2;
  font-size: 16px;
  margin-top: 0px;

  

  ul {
    margin-top: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    
     & > li:last-of-type {
      font-weight: bold;
      font-style: italic;
      border: 1px solid white;
      padding: 5px;
    }  
  }

  li {
    list-style-type: none;
  }

  h3 {
  margin-bottom: 0px;
  }
`;

export const StartLessonButton = styled.button`
  padding: 10px 30px;
  margin-top: 30px;
  background-color: rgb(112, 241, 47);
  border: none;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background-color: #d14b26;
    transform: scale(1.05);
  }
`;