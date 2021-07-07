import { useModules } from "../../hooks/useModules";
import { AiOutlineEdit } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import './styles.scss';
import { FormEvent } from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

export function ModulesTable(){
  const [module, setModule] = useState('');
  const [idModulesEditing, setIdModulesEditing] = useState(0);
  const [editingMode, setEditingMode] = useState(false);
  const { modules, handleSelectModule, getModules } = useModules();
  const { tokenAuth } = useAuth();

  async function handleAddNewModule(event: FormEvent){
    event.preventDefault();
    const config = {
      authorization: `Bearer ${tokenAuth.token}`
    }
    try{
      const name = module;
      const newModule = {
        name
      };

      if(name === ''){
        alert('Nome do módulo não informado');
        return;
      }

      const response = await api.post('/module', newModule, {headers: config});
      if(response.data.hasOwnProperty('erro')){
       alert('Erro ao adicionar módulo');
       return;
      }
      getModules();
    } catch(error){
      alert('Erro ao adicionar módulo');
      return;
    }
  }

  async function handleRemoveModule(id: number){
    const config = {
      authorization: `Bearer ${tokenAuth.token}`
    }
    try{
      const response = await api.delete(`/module/${id}`, {headers: config});
      if(response.data.hasOwnProperty('erro')){
        alert('Erro ao excluir módulo');
        return;
      }
      getModules();
    }catch(error){
      alert('Erro ao excluir módulo');
      return;
    }
  }


  async function handleEditModule(id: number, event: FormEvent){
    event.preventDefault();

    const config = {
      authorization: `Bearer ${tokenAuth.token}`
    }
    try{
      const name = module;
      const newModule = {
        name
      };

      if(name === ''){
        alert('Nome do módulo não informado');
        return;
      }

      const response = await api.put(`/module/${id}`, newModule, {headers: config});
      if(response.data.hasOwnProperty('erro')){
       alert('Erro ao editar módulo');
       return;
      }
      setEditingMode(false);
      setModule('');
      setIdModulesEditing(0);
      getModules();
    } catch{
      alert('Erro ao editar módulo');
      return;
    }
  }



  return(
    <>
      <div className="content-admin-module">
        <h1>Módulos - Adicione, Edite ou Exclua</h1>
        {!editingMode ? (
          <form className="module-form-default" onSubmit={handleAddNewModule}>
            <input 
              type="text"
              placeholder="Digite o nome do módulo..."
              value={module}
              onChange={event => setModule(event.target.value)}
            />
            <button type="submit">Adicionar</button>
          </form>
        ) : (
          <form className="module-form-default" onSubmit={event => handleEditModule(idModulesEditing, event)}>
            <input 
              type="text"
              placeholder="Digite o nome do módulo..."
              value={module}
              onChange={event => setModule(event.target.value)}
            />
             <button type="submit">Editar</button>
             <button type="button" onClick={() => {
               setEditingMode(false);
               setModule('');
             }
             }>Cancelar</button>
         </form>
        )}

        <table className="modules-table">
        <thead>
          <tr>
            <th>Nome do Módulo</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>

        <tbody>
          {modules.map(module => {
            return (
              <tr key={module.id}>
                <td onClick={() => handleSelectModule(module.id)}>{module.name}</td>
                <td>
                  <button 
                    type="button"
                    onClick={() => {
                      setEditingMode(true);
                      setModule(module.name);
                      setIdModulesEditing(module.id);
                    }}
                  >
                      <AiOutlineEdit color="#FFFFFF"/>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleRemoveModule(module.id)}
                  >
                    <FiTrash color="#FFFFFF"/>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      </div>
    </>
  );
}