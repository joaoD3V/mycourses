import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useModules } from "../../hooks/useModules";
import { AiOutlineEdit } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import './styles.scss';
import { api } from "../../services/api";

export function LessonsTable(){
  const [editingMode, setEditingMode] = useState(false);
  const [moduleRelated, setModuleRelated] = useState('');
  const [nameLesson, setNameLesson] = useState('');
  const [url, setUrl] = useState('');
  const [startDate, setStartDate] = useState('');
  const [idLessonsEditing, setIdLessonsEditing] = useState(0);
  const { moduleSelectLessons, moduleSelect, handleConvertModuleIdInModuleName, modules, handleConvertModuleNameInModuleId, getLessons } = useModules();
  const { tokenAuth } = useAuth();

  async function handleAddNewLesson(event: FormEvent){
    event.preventDefault();
    const config = {
      authorization: `Bearer ${tokenAuth.token}`
    }
    try{
     

      if(nameLesson === '' || url === '' || startDate === ''){
        alert('Dados não informados corretamente');
        return;
      }

      if(moduleSelect !== undefined){
        const newLesson = {
          id_modules: handleConvertModuleNameInModuleId(moduleSelect.name),
          name: nameLesson,
          video_url: url,
          startLessonDate: startDate
        };
        const response = await api.post('/lesson', newLesson, {headers: config});
        console.log(response.data);
        if(response.data.hasOwnProperty('erro')){
         alert('Erro ao adicionar aula');
         return;
        }
        await getLessons();

      }

     
    } catch(error){
      alert('Erro ao adicionar aula');
      return;
    }
  }

  // async function handleRemoveModule(id: number){
  //   const config = {
  //     authorization: `Bearer ${tokenAuth.token}`
  //   }
  //   try{
  //     const response = await api.delete(`/module/${id}`, {headers: config});
  //     if(response.data.hasOwnProperty('erro')){
  //       alert('Erro ao excluir módulo');
  //       return;
  //     }
  //   }catch(error){
  //     alert('Erro ao excluir módulo');
  //     return;
  //   }
  // }


  // async function handleEditModule(id: number, event: FormEvent){
  //   event.preventDefault();

  //   const config = {
  //     authorization: `Bearer ${tokenAuth.token}`
  //   }
  //   try{
  //     const name = module;
  //     const newModule = {
  //       name
  //     };

  //     if(name === ''){
  //       alert('Nome do módulo não informado');
  //       return;
  //     }

  //     const response = await api.put(`/module/${id}`, newModule, {headers: config});
  //     if(response.data.hasOwnProperty('erro')){
  //      alert('Erro ao editar módulo');
  //      return;
  //     }
  //     setEditingMode(false);
  //     setModule('');
  //     setIdModulesEditing(0);
  //   } catch{
  //     alert('Erro ao editar módulo');
  //     return;
  //   }
  // }
 
  return (
    <>
      {moduleSelect !== undefined &&
        <>

        <div className="content-admin-lesson">
          <h1>{moduleSelect.name} - Adicione, Edite ou Exclua</h1>
          {!editingMode ? (
            <form className="module-form-default" onSubmit={handleAddNewLesson}>
              <input 
                type="text"
                placeholder="Nome da aula..."
                value={nameLesson}
                onChange={event => setNameLesson(event.target.value)}
              />
               <input 
                type="text"
                placeholder="URL Embed do Vídeo..."
                value={url}
                onChange={event => setUrl(event.target.value)}
              />
              <input 
                type="date"
                placeholder="Data de Início..."
                value={startDate}
                onChange={event => setStartDate(event.target.value)}
              />
              <button type="submit">Adicionar</button>
            </form>
          ) : (
            <form className="module-form-default">
              <input 
                type="text"
                placeholder="Nome da aula..."
                value={nameLesson}
                onChange={event => setNameLesson(event.target.value)}
              />
               <input 
                type="text"
                placeholder="URL do Vídeo..."
                value={url}
                onChange={event => setUrl(event.target.value)}
              />
              <input 
                type="date"
                placeholder="Data de Início..."
                value={startDate}
                onChange={event => setStartDate(event.target.value)}
              />
              <button type="submit">Editar</button>
              <button type="button">Cancelar</button>
          </form>
          )}

          {moduleSelectLessons !== undefined ? (
            <table className="lessons-table">
              <thead>
                <tr>
                  <th>Módulo Relelacionado</th>
                  <th>Nome da Aula</th>
                  <th>URL do Vídeo</th>
                  <th>Data de Início</th>
                  <th>Editar</th>
                  <th>Excluir</th>
                </tr>
              </thead>

              <tbody>
                {moduleSelectLessons.map(lesson => {
                  return (
                    <tr key={lesson.id}>
                      <td>{handleConvertModuleIdInModuleName(lesson.id_modules)}</td>
                      <td>{lesson.name}</td>
                      <td>{lesson.video_url}</td>
                      <td>{new Intl.DateTimeFormat('pt-BR').format(
                    new Date(lesson.startLessonDate))}</td>
                      <td>
                        <button 
                          type="button"
                          onClick={() => {
                            setEditingMode(true);
                            setNameLesson(lesson.name);
                            setUrl(lesson.video_url);
                            setIdLessonsEditing(lesson.id);
                          }}
                        >
                            <AiOutlineEdit color="#FFFFFF"/>
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                        >
                          <FiTrash color="#FFFFFF"/>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            ): (
              <h2>Nenhuma aula cadastrada ainda</h2>
            )
          }
        </div>
        </>
      }
    </>
  )
}