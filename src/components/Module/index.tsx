import './styles.scss';
import cx from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type ModuleProps = ButtonHTMLAttributes<HTMLButtonElement> &{
  title: string;
  videoQuantity: number;
  isSelected: boolean;
}

export function Module({title, videoQuantity, isSelected, ...props}: ModuleProps){
  return(
    <button 
      className={cx(
        'module',
        {selected: isSelected}
      )}
      {...props}
    >
    <h4>{title}</h4>
    <span>{videoQuantity} aulas</span>
     
   </button>
  );
}