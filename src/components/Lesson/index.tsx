import './styles.scss';
import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

type LessonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
  name: string;
  videoURL: string;
  startLessonDate: Date;
  isSelected: boolean;
}

export function Lesson({name, videoURL, startLessonDate, isSelected, ...props}: LessonProps){
  return(
    <button
      className={cx(
        'lesson',
        {selected: isSelected}
      )}
      {...props}
    >
      {name}
    </button>
);
}