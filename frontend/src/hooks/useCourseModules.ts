import { useState } from "react";
import { customizationModule } from "../modules/customizationModule";
import { levelDesignModule } from "../modules/levelDesignModule";
import { narrativeDesignModule } from "../modules/narrativeDesignModule";

const useCourseModules = () => {
  const modules = [customizationModule, levelDesignModule, narrativeDesignModule];
  const [activeModule, setActiveModule] = useState(customizationModule);

  // Lógica de troca de módulo
  const handleModuleChange = (moduleId: string) => {
    const selectedModule = modules.find((module) => module.id === moduleId);
    if (selectedModule) {
      setActiveModule(selectedModule);
    }
  };

  return { modules, activeModule, handleModuleChange };
};

export default useCourseModules;
