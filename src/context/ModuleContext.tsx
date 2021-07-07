import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type ModuleModel = {
  id: number;
  name: string;
  isSelected: boolean;
}

type LessonModel = {
  id: number;
  id_modules: number;
  name: string;
  video_url: string;
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
  lessons: LessonModel[];
  moduleSelectLessons: LessonModel[] | undefined;
  lessonSelect: LessonModel;
  moduleSelect: ModuleModel | undefined;
  handleSumModuleLessons: (id: number) => number;
  handleSelectModule: (id: number) => void;
  handleSelectLesson: (id: number) => void;
  handleConvertModuleIdInModuleName: (id: number) => string | undefined;
  handleConvertModuleNameInModuleId: (name: string) => number | undefined;
  getModules: () => Promise<void>;
  getLessons: () => Promise<void>;
}

export const ModuleContext = createContext({} as ModuleContexType);

export function ModuleContextProvider(props: ModuleContextProviderProps){
  const [modules, setModules] = useState<ModuleModel[]>([]);
  const [lessons, setLessons] = useState<LessonModel[]>([]);
  const [moduleSelectLessons, setModuleSelectLessons] = useState<LessonModel[] | undefined>(undefined);
  const [lessonSelect, setLessonSelect] = useState<LessonModel>({} as LessonModel);
  const [moduleSelect, setModuleSelect] = useState<ModuleModel | undefined>(undefined);

  useEffect(() => {
    async function getModules(){
      try{
        const response = await api.get('module');
        const dataModules = response.data;
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
    async function getLessons(){
      try{
        const response = await api.get('lesson');
        const dataLessons = response.data;
        const newLesson = dataLessons.map((lesson: LessonModel) => {
          const newLesson = {...lesson, isSelected: false};
          return newLesson;
        })

        newLesson.sort((a: Sort, b: Sort) => {
                  if(a.name < b.name) { return -1; }
                  if(a.name > b.name) { return 1; }
                  return 0;
        });

        setLessons(newLesson);
      } catch {
        throw new Error('Erro ao buscar informações no Banco de Dados')
      }
    }
    getLessons();
    getModules();

  }, [modules]);


  async function getModules(){
    try{
      const response = await api.get('module');
      const dataModules = response.data;
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

  async function getLessons(){
    try{
      const response = await api.get('lesson');
      const dataLessons = response.data;
      const newLesson = dataLessons.map((lesson: LessonModel) => {
        const newLesson = {...lesson, isSelected: false};
        return newLesson;
      })

      newLesson.sort((a: Sort, b: Sort) => {
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
      });

      setLessons(newLesson);
    } catch {
      throw new Error('Erro ao buscar informações no Banco de Dados')
    }
  }

  function handleSelectLesson(id: number){
    if(moduleSelectLessons !== undefined){
      const newLessons = [...moduleSelectLessons];
      newLessons.forEach(lesson => {
        if(lesson.isSelected === true){
          lesson.isSelected = false;
        }
        if(lesson.id === id){
          lesson.isSelected = true;
          setLessonSelect(lesson);
        }
      })
  
      setModuleSelectLessons(newLessons);
    }

  }

  function handleSelectModule(id: number){
    const newModules = [...modules];
    const newLessons = [...lessons];

    newModules.forEach(module => {
      if(module.isSelected === true){
        module.isSelected = false;
      }
      if(module.id === id){
        module.isSelected = true;
        setModuleSelect(module);
        const moduleLessons = newLessons.filter(lesson => lesson.id_modules === module.id);
        if(moduleLessons.length > 0){
          moduleLessons[0].isSelected = true;
          setModuleSelectLessons(moduleLessons);
          setLessonSelect(moduleLessons[0]);
        } else {
          setModuleSelectLessons(undefined);
        }
      }
    })

    setModules(newModules);



  }

  function handleSumModuleLessons(id: number){
    const newLessons = [...lessons]; 
    const moduleLessons = newLessons.filter(lesson => lesson.id_modules === id);
    return moduleLessons.length;
  }

  function handleConvertModuleIdInModuleName(id: number){
    const newModules = [...modules];
    const moduleName = newModules.find((module: ModuleModel | undefined) => module?.id === id);
    return moduleName?.name;
  }

  function handleConvertModuleNameInModuleId(name: string){
    const newModules = [...modules];
    const moduleName = newModules.find((module: ModuleModel | undefined) => module?.name === name);
    return moduleName?.id;
  }

  return (
    <ModuleContext.Provider value={
      { 
        modules, 
        lessons, 
        moduleSelectLessons, 
        handleSumModuleLessons, 
        handleSelectModule, 
        handleSelectLesson, 
        lessonSelect, 
        moduleSelect, 
        handleConvertModuleIdInModuleName,
        handleConvertModuleNameInModuleId,
        getModules,
        getLessons
      }
    }>
      {props.children}
    </ModuleContext.Provider>
  );
}