import { useState } from "preact/hooks";
import githubLogo from "../images/github-logo.png";
import linkedinLogo from "../images/Linkedin_logo.png";
import { dispatcher } from "./Dispatcher";
import { ProjectType } from "./PROJECTS";

const project_type_selection = 
  "project_type_selection tracking-wide \
  hover:bg-gradient-to-r hover:from-white/50 hover:to-white/0 hover:tracking-normal hover:text-white \
  active:from-white/70 active:scale-[101%] \
  rounded-sm \
  hover:font-semibold \
  cursor-pointer px-2 py-1 "

const activeStyle = 
  "bg-gradient-to-r from-white/50 from-30% to-white/0 tracking-normal text-white"

export default function Nav() {

  const [active, setActive] = useState("all");

  function selectProject(types: ProjectType[]) {
    if (types.length > 0) setActive(types[0]);
    else setActive("all");
    dispatcher.dispatch("projectTypeSelected", types);
  }

  function selectFeatured() {
    setActive("featured");
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
        
        <h2 className="text-xl text-slate-400 font-bold mb-2 border-b w-full">Projects:</h2>
        <ul className="flex flex-col text-base text-slate-200 ml-4 w-full">
          <li className={project_type_selection + (active === "all" ? activeStyle : "")} onClick={() => selectProject([])}>All</li>
          <li className={project_type_selection + (active === "featured" ? activeStyle : "")} onClick={() => selectFeatured()}>Featured</li>
          <li className={project_type_selection + (active === "React" ? activeStyle : "")} onClick={() => selectProject(["React", "Preact"])}>React / Preact</li>
          <li className={project_type_selection + (active === "TypeScript" ? activeStyle : "")} onClick={() => selectProject(["TypeScript"])}>Typescript</li>
          <li className={project_type_selection + (active === "Java" ? activeStyle : "")} onClick={() => selectProject(["Java"])}>Java</li>
          <li className={project_type_selection + (active === "C++" ? activeStyle : "")} onClick={() => selectProject(["C++"])}>C++</li>
          <li className={project_type_selection + (active === "WebAssembly" ? activeStyle : "")} onClick={() => selectProject(["WebAssembly"])}>WebAssembly</li>
          <li className={project_type_selection + (active === "JavaScript" ? activeStyle : "")} onClick={() => selectProject(["Javascript"])}>Vanilla JS</li>
        </ul>

      </div>

    </nav>
  )
}