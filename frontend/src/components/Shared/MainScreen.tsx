import React, { useState } from "react";
import useCourseModules from "../../hooks/useCourseModules";
import ChatBot from "../ChatBot/ChatBot";


import { 
  CourseContainer, 
  // Sidebar, 
  // ModuleList, 
  // ModuleItem, 
  Section, 
  // MainContent, 
  ContentWrapper, 
  ModuleTitle, 
  ModuleDescription, 
  FullWidthImage, 
  LessonContainer, 
  LessonTitle, 
  // SideBySideContainer, 
  ContentColumn, 
  LessonContent,
  HamburgerButton, // 🔹 Botão de abrir menu
  CloseButton // 🔹 Botão de fechar menu
} from "./styles/MainScreen.styles";


const CourseScreen: React.FC = () => {
  const { modules, activeModule, handleModuleChange } = useCourseModules();
  const [showChat] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <CourseContainer>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
        {isSidebarOpen ? (
          <CloseButton onClick={() => setIsSidebarOpen(false)}>✖</CloseButton>
        ) : (
          <HamburgerButton onClick={() => setIsSidebarOpen(true)}>☰</HamburgerButton>
        )}
      </div>

      {/* 🔹 Sidebar aparece apenas quando isSidebarOpen for true */}
      {/* <Sidebar $isOpen={isSidebarOpen}> */}
      <div style={{
        position: "fixed",
        left: isSidebarOpen ? 0 : "-240px",
        top: 0,
        width: "240px",
        height: "100%",
        background: "#fff",
        boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        transition: "left 0.3s",
        zIndex: 999,
        padding: "24px 16px"
      }}>
        <ul>
          {modules.map((module, index) => (
            <li
              key={index}
              style={{
                fontWeight: module.id === activeModule.id ? "bold" : "normal",
                cursor: "pointer",
                transition: "opacity 0.3s",
                opacity: isSidebarOpen ? 1 : 0.5,
                marginBottom: "8px"
              }}
              onClick={() => handleModuleChange(module.id)}
            >
              {module.title}
            </li>
          ))}
        </ul>
      </div>
      {/* </Sidebar> */}

      {/* 🔹 Alterna entre ChatBot e módulos do curso */}
      <ContentWrapper $isSidebarOpen={isSidebarOpen}>
        {showChat ? (
          <ChatBot/>
        ) : (
          <>
            <Section>
              <ModuleTitle>{activeModule.title}</ModuleTitle>
              <ModuleDescription>{activeModule.description}</ModuleDescription>
            </Section>

            <div>
              <FullWidthImage src={activeModule.imageUrl} alt="Imagem do Módulo" />

              {activeModule.lessons.map((lesson, index) => {
                const splitContent = lesson.content.split("\n\n");

                return (
                  <LessonContainer key={index}>
                    <LessonTitle>{lesson.title}</LessonTitle>

                    {splitContent.length >= 2 ? (
                      <div style={{ display: "flex", gap: "16px" }}>
                        <ContentColumn>
                          <LessonContent>
                            <h2 dangerouslySetInnerHTML={{ __html: splitContent[0].replace(/\n/g, "<br>") }} />
                          </LessonContent>
                        </ContentColumn>
                        <ContentColumn>
                          <LessonContent>
                            <h3 dangerouslySetInnerHTML={{ __html: splitContent[1].replace(/\n/g, "<br>") }} />
                          </LessonContent>
                        </ContentColumn>
                      </div>
                    ) : (
                      <ContentColumn>
                        <LessonContent dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, "<br>") }} />
                      </ContentColumn>
                    )}
                  </LessonContainer>
                );
              })}
            </div>
          </>
        )}
      </ContentWrapper>
    </CourseContainer>
  );
};

export default CourseScreen;
