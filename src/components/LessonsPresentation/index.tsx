
import { useModules } from '../../hooks/useModules';
import { Lesson } from '../Lesson';
import './styles.scss';

export function LessonsPresentation(){
  const { moduleSelectLessons, lessonSelect, handleSelectLesson, moduleSelect} = useModules();

  return(
    <>
      {moduleSelect !== undefined && 
          <div className="content">
            <h2 className="title">{moduleSelect.name}</h2>
            <h3 className="text-information">Todas as aulas disponíveis nesse módulo:</h3>
            <div className="lessons">
                {lessonSelect !== undefined && 
                  <iframe src={lessonSelect.video_url} title={lessonSelect.name} frameBorder="0" allowFullScreen></iframe>
                }
                {moduleSelectLessons !== undefined &&
                  <div className="lessons-information">
                    <span>{moduleSelectLessons.length > 1 ? `${moduleSelectLessons.length} aulas` : `${moduleSelectLessons.length} aula`}</span>
                    <div className="lesson-list">
                      {moduleSelectLessons.map(lesson => {
                        return (
                          <Lesson 
                            key={lesson.id}
                            name={lesson.name} 
                            videoURL={lesson.video_url} 
                            startLessonDate={lesson.startLessonDate}
                            isSelected={lesson.isSelected}
                            onClick={() => handleSelectLesson(lesson.id)}
                          />
                        );
                      })}
                    </div>  
                  </div>
                }
            </div>   

          </div>
      }
    </>
  );
}