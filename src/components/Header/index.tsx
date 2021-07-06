import { useHistory } from 'react-router-dom';
import './styles.scss';


export function Header(){
  const history = useHistory();

  function handleLogin(){
    history.push('/login');
  }



  return (
    <header>
      <div className="content">
        <h2>&lt;My Courses/&gt;</h2>
        <button type="button" onClick={handleLogin}>Login Administrativo</button>
      </div>
    </header>
  );
}