import { useContext } from 'react';
import { ModuleContext } from '../context/ModuleContext';

export function useModules(){
  const value = useContext(ModuleContext);

  return value;
}