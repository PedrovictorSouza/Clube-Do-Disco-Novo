import React from "react";
import HomeHeroSection from "../HomeHeroSection";

interface StartViewProps {
    onStartCourse: () => void;
    hideButton: boolean;
    startTransition: boolean;
}

const StartView: React.FC<StartViewProps> = (props) => {
    return <HomeHeroSection {...props} />
};

export default StartView;