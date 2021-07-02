import { useEffect } from 'react';
import { useState } from 'react';
import { useModules } from '../../hooks/useModules';
import './styles.scss';

type ModuleModel = {
  id: number;
  name: string;
  isSelected: boolean;
  lessons: Lesson[];
}

type Lesson = {
  id: number;
  name: string;
  videoURL: string;
  startLessonDate: Date;
}


export function LessonsPresentation(){
  const [module, setModule] = useState<ModuleModel | undefined>(undefined);
  const { modules } = useModules();

  useEffect(() => {
    const currentModules = [...modules];
    currentModules.forEach(module => {
      if(module.isSelected === true){
        setModule(module);
      } 
    })
  }, [modules])

  return(
    <>
      {module !== undefined && 
          <div className="content">
            <h2 className="title">{module?.name}</h2>
            <h3 className="text-information">Todas as aulas disponíveis nesse módulo:</h3>
            <div className="lessons">
                  <iframe src={module?.lessons[0].videoURL} title={module?.lessons[0].name} frameBorder="0" allowFullScreen></iframe>
                  <div className="lesson-list">
                    <button>
                      {module.lessons[0].name}
                    </button>
                    <button>
                      {module.lessons[1].name}
                    </button>
                    <button>
                      {module.lessons[2].name}
                    </button>
                  </div>  
            </div>   

          </div>
      }
    </>
  );
}