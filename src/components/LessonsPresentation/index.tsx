import { useEffect } from 'react';
import { useState } from 'react';
import { useModules } from '../../hooks/useModules';
import { Lesson } from '../Lesson';
import './styles.scss';

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
  startLessonDate: Date;
  isSelected: boolean;
}

type Sort = {
  name: string;
}


export function LessonsPresentation(){
  const [module, setModule] = useState<ModuleModel | undefined>(undefined);
  const [lessons, setLessons] = useState<LessonModel[]>([]);
  const [lessonSelected, setLessonSelected] = useState<LessonModel>({} as LessonModel);
  const { modules } = useModules();


  useEffect(() => {
   async function loadModule(){
      const currentModules = [...modules];
       currentModules.forEach(module => {
          if(module.isSelected === true){
            module.lessons.sort((a: Sort, b: Sort) => {
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
            });
            const currentLessons = module.lessons.map((lesson: LessonModel) => {
              const currentLessons = {...lesson, isSelected: false};
              return currentLessons;
            })
            currentLessons[0].isSelected = true;
            setLessons(currentLessons);
            setModule(module);
          } 
        });

        
    }

   async function loadLessonSelected(){
      const newLessons = {...modules};
      setLessonSelected(newLessons[0].lessons[0]);
    }

    loadModule();
    loadLessonSelected();

    }, [modules])


    function handleSelectLesson(id: number){
      console.log('clicado')
      const newLessons = [...lessons];

      newLessons.forEach(lesson => {
        if(lesson.isSelected === true){
          lesson.isSelected = false;
        }
        if(lesson.id === id){
          lesson.isSelected = true;
          setLessonSelected(lesson);
        }
      })
  
      setLessons(newLessons);
    }

    
  return(
    <>
      {module !== undefined && 
          <div className="content">
            <h2 className="title">{module.name}</h2>
            <h3 className="text-information">Todas as aulas disponíveis nesse módulo:</h3>
            <div className="lessons">
                {lessonSelected !== undefined && 
                  <iframe src={lessonSelected.videoURL} title={lessonSelected.name} frameBorder="0" allowFullScreen></iframe>
                }
                  <div className="lessons-information">
                    <span>{lessons.length} aulas</span>
                    <div className="lesson-list">
                      {lessons.map(lesson => {
                        return (
                          <Lesson 
                            key={lesson.id}
                            name={lesson.name} 
                            videoURL={lesson.videoURL} 
                            startLessonDate={lesson.startLessonDate}
                            isSelected={lesson.isSelected}
                            onClick={() => handleSelectLesson(lesson.id)}
                          />
                        );
                      })}
                    </div>  
                  </div>
            </div>   

          </div>
      }
    </>
  );
}