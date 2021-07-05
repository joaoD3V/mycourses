import { useModules } from '../../hooks/useModules';
import { Module } from '../Module';
import './styles.scss';



export function ModulesPresentation(){
  const { modules, handleSumModuleLessons, handleSelectModule } = useModules();

  return(
    <>
      <div className="content">
        <h2 className="title">Módulos</h2>
        <h3 className="text-information">Selecione o módulo para ver as aulas disponíveis:</h3>

        <div className="modules">
          {modules.map(module => {
            return (
              <Module 
                key={module.id}
                title={module.name} 
                videoQuantity={handleSumModuleLessons(module.id)}
                isSelected={module.isSelected}
                onClick={() => handleSelectModule(module.id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}