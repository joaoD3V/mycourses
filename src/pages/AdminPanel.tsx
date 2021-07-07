import { Header } from "../components/Header";
import { LessonsTable } from "../components/LessonsTable";
import { ModulesTable } from "../components/ModulesTable";

export function AdminPanel(){
  return (
    <>
      <Header />
      <ModulesTable />
      <LessonsTable />
    </>
  );
}