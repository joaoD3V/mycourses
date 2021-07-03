import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type ModuleModel = {
  id: number;
  name: string;
  isSelected: boolean;
  lessons: LessonModel[];
}

type LessonModel = {
  id: number;
  name: string;
  videoURL: string;
  isSelected: boolean;
  startLessonDate: Date;
}

type ModuleContextProviderProps = {
  children: ReactNode;
}

type Sort = {
  name: string;
}

type ModuleContexType = {
  modules: ModuleModel[];
  handleSelectModule: (id: number) => void;
}

export const ModuleContext = createContext({} as ModuleContexType);

export function ModuleContextProvider(props: ModuleContextProviderProps){
  const [modules, setModules] = useState<ModuleModel[]>([]);

  useEffect(() => {
    async function getModules(){
      try{
        const {data} = await api.get('modules');
        const dataModules = data.modules
        const newModule = dataModules.map((module: ModuleModel) => {
          const newModule = {...module, isSelected: false};
          return newModule;
        })

        newModule.sort((a: Sort, b: Sort) => {
                  if(a.name < b.name) { return -1; }
                  if(a.name > b.name) { return 1; }
                  return 0;
        });

        setModules(newModule);
      } catch {
        throw new Error('Erro ao buscar informações no Banco de Dados')
      }
    }
    getModules();

  }, []);


  function handleSelectModule(id: number){
    const newModules = [...modules];

    newModules.forEach(module => {
      if(module.isSelected === true){
        module.isSelected = false;
      }
      if(module.id === id){
        module.isSelected = true;
      }
    })

    setModules(newModules);

  }

  return (
    <ModuleContext.Provider value={{modules, handleSelectModule}}>
      {props.children}
    </ModuleContext.Provider>
  );
}