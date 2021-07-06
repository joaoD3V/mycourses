import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import '../styles/admin.scss';

export function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSetToken } = useAuth();
  const history = useHistory();


  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(!email || !password){
      alert('Email ou senha não informados.');
      return;
    }

    try{
      const administrator = {
        email,
        password
      }
      const response = await api.post('/token', administrator);
      handleSetToken(response.data);
      return history.push('/admin');
    } catch (error){
      alert('Administrador não encontrado.');
      return;
    }
  }



  return (
    <>
      <div className="content-admin">
        <h2>&lt;My Courses/&gt;</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email"
            placeholder="Digite seu e-mail..."
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input 
            type="password"
            placeholder="Digite sua senha..."
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </>

  );
}