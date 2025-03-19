import React, { useState } from "react";
import useCourseModules from "../hooks/useCourseModules";
import ChatBot from "./ChatBot";

import { 
  CourseContainer, 
  Sidebar, 
  ModuleList, 
  ModuleItem, 
  TopSection, 
  MainContent, 
  ContentWrapper, 
  ModuleTitle, 
  ModuleDescription, 
  FullWidthImage, 
  LessonContainer, 
  LessonTitle, 
  SideBySideContainer, 
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
      <Sidebar $isOpen={isSidebarOpen}>

        <ModuleList>
          {modules.map((module, index) => (
            <ModuleItem
              key={index}
              $isActive={module.id === activeModule.id}
              delay={index * 150}
              onClick={() => handleModuleChange(module.id)}
            >
              {module.title}
            </ModuleItem>
          ))}
        </ModuleList>
      </Sidebar>

      {/* 🔹 Alterna entre ChatBot e módulos do curso */}
      <ContentWrapper $isSidebarOpen={isSidebarOpen}>
        {showChat ? (
          <ChatBot/>
        ) : (
          <>
            <TopSection>
              <ModuleTitle>{activeModule.title}</ModuleTitle>
              <ModuleDescription>{activeModule.description}</ModuleDescription>
            </TopSection>

            <MainContent>
              <FullWidthImage src={activeModule.imageUrl} alt="Imagem do Módulo" />

              {activeModule.lessons.map((lesson, index) => {
                const splitContent = lesson.content.split("\n\n");

                return (
                  <LessonContainer key={index}>
                    <LessonTitle>{lesson.title}</LessonTitle>

                    {splitContent.length >= 2 ? (
                      <SideBySideContainer>
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
                      </SideBySideContainer>
                    ) : (
                      <ContentColumn>
                        <LessonContent dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, "<br>") }} />
                      </ContentColumn>
                    )}
                  </LessonContainer>
                );
              })}
            </MainContent>
          </>
        )}
      </ContentWrapper>
    </CourseContainer>
  );
};

export default CourseScreen;
