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
  const { modules } = useModules();
  const { tokenAuth } = useAuth();

  async function handleAddNewModule(event: FormEvent){
    event.preventDefault();
    const config = {
      authorization: `Bearer ${tokenAuth.token}`
    }
    console.log(config)
    try{
      const name = module;
      const newModule = {
        name
      };
      const response = api.post('/module', newModule, {headers: config});
      console.log(response);
    } catch(error){
      alert('Erro ao adicionar módulo');
      return;
    }
  }



  return(
    <>
      <form className="module-form" onSubmit={handleAddNewModule}>
        <input 
          type="text"
          placeholder="Digite o nome do módulo..."
          value={module}
          onChange={event => setModule(event.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
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
              <td>{module.name}</td>
              <td><button><AiOutlineEdit color="#FFFFFF"/></button></td>
              <td><button><FiTrash color="#FFFFFF"/></button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  );
}