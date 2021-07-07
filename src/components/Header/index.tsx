import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './styles.scss';


export function Header(){
  const { tokenAuth } = useAuth();
  const history = useHistory();

  function handleLogin(){
    history.push('/login');
  }

  function handleLogout(){
    history.push('/');
  }



  return (
    <header>
      <div className="content">
        <h2>&lt;My Courses/&gt;</h2>
        {!tokenAuth ? (
          <button type="button" onClick={handleLogin}>Login Administrativo</button>
        ): (
          <button type="button" onClick={handleLogout}>Voltar para a Home</button>
        )}
        
      </div>
    </header>
  );
}