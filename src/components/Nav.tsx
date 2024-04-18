import { useState } from "preact/hooks";
import githubLogo from "../images/github-logo.png";
import linkedinLogo from "../images/Linkedin_logo.png";
import { dispatcher } from "./Dispatcher";
import { ProjectType } from "./PROJECTS";

const project_type_selection = 
  "project_type_selection hover:bg-gradient-to-r hover:from-white/50 hover:to-white/0 \
  cursor-pointer"

export default function Nav() {

  const [selectedType, setSelectedType] = useState("test");

  function selectProject(types: ProjectType[]) {
    dispatcher.dispatch("projectTypeSelected", types);
  }

  function selectFeatured() {
    dispatcher.dispatch("selectFeatured", null);
  }

  return (
    <nav>

      <div className="flex flex-col items-start fixed">
        <h1 className="text-7xl mb-8">mgporter</h1>

        <div className="flex flex-col gap-1 mb-12 text-lg">
          <a className="flex items-center gap-2" href="https://github.com/mgporter">
            <img src={githubLogo} alt="Github profile" className="size-6 invert"></img>
            <h2>https://github.com/mgporter</h2>
          </a>
          <a className="flex items-center gap-2" href="https://linkedin.com/in/mgporter772">
            <img src={linkedinLogo} alt="LinkedIn profile" className="size-6"></img>
            <h2>https://linkedin.com/in/mgporter772</h2>
          </a>
        </div>
        
        <h2 className="text-xl mb-2">Projects:</h2>
        <ul className="text-base ml-4 w-[70%]">
          <li className={project_type_selection} onClick={() => selectProject([])}>All</li>
          <li className={project_type_selection} onClick={() => selectFeatured()}>Featured</li>
          <li className={project_type_selection} onClick={() => selectProject(["React", "Preact"])}>React / Preact</li>
          <li className={project_type_selection} onClick={() => selectProject(["TypeScript"])}>Typescript</li>
          <li className={project_type_selection} onClick={() => selectProject(["Java"])}>Java</li>
          <li className={project_type_selection} onClick={() => selectProject(["C++"])}>C++</li>
          <li className={project_type_selection} onClick={() => selectProject(["WebAssembly"])}>WebAssembly</li>
          <li className={project_type_selection} onClick={() => selectProject(["Javascript"])}>Vanilla JS</li>
        </ul>

      </div>

    </nav>
  )
}