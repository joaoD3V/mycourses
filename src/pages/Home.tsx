import { Header } from "../components/Header";
import { LessonsPresentation } from "../components/LessonsPresentation";
import { ModulesPresentation } from "../components/ModulesPresentation";

export function Home(){
  return (
    <>
      <Header />
      <ModulesPresentation />
      <LessonsPresentation />
    </>
  );
}