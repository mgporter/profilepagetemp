import { useEffect, useState } from "preact/hooks";
import githubLogo from "../images/github-logo.png";
import linkedinLogo from "../images/Linkedin_logo.png";
import { dispatcher } from "./Dispatcher";
import { ProjectType } from "./PROJECTS";
import profileColorPic from "../images/profile_picture_color.jpg";

const project_type_selection = 
  "project_type_selection tracking-wide \
  hover:bg-gradient-to-r hover:from-white/50 hover:to-white/0 hover:text-white \
  active:from-white/70 active:scale-[101%] active:translate-x-[2px] \
  rounded-sm \
  cursor-pointer px-2 py-1 "

const activeStyle = 
  "bg-gradient-to-r from-white/50 from-30% to-white/0 text-white font-bold tracking-normal"

export default function Nav() {

  const [active, setActive] = useState("all");

  useEffect(() => {
    // const root = document.documentElement;

    // root.classList.add("dark");

  }, [])

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
    <nav className="flex flex-col items-center justify-start">

      <div className="navcontainer flex flex-col items-start fixed sm:static sm:max-w-[30rem]">

        <div className="title relative z-10 size-44 self-center mt-8 mb-[-48px] ml-[-4rem]">
          <img src={profileColorPic} className="relative rounded-full z-20"></img>
          <div className="absolute z-10 top-6 left-10 size-52 scale-y-[0.2] scale-x-[1.1] translate-y-[2rem] rounded-[100%] bg-stone-600/60"></div>
          <div className="absolute z-[9] top-6 left-2 size-60 scale-y-[0.21] scale-x-[1.1] translate-y-[1.2rem] rounded-[100%] bg-black/60"></div>
        </div>
        
        <h1 className="title relative z-20 text-6xl mb-8 self-center">mgporter</h1>

        <div className="relative z-20 flex flex-col gap-1 mb-12 text-lg ">
          <a className="flex group items-center gap-2 hover:text-white" href="https://github.com/mgporter" target="_blank">
            <img src={githubLogo} alt="Github profile" className="size-6 invert-[0.9] group-hover:invert"></img>
            <h2>https://github.com/mgporter</h2>
          </a>
          <a className="flex group items-center gap-2 hover:text-white" href="https://linkedin.com/in/mgporter772" target="_blank">
            <img src={linkedinLogo} alt="LinkedIn profile" className="size-6 brightness-90 group-hover:brightness-110"></img>
            <h2>https://linkedin.com/in/mgporter772</h2>
          </a>
        </div>
        
        <h2 className="text-xl font-bold mb-2 border-b w-full">Filter projects:</h2>
        <ul className="flex flex-col flex-wrap text-base ml-4 w-full sm:h-[10rem]">
          <li className={project_type_selection + (active === "all" ? activeStyle : "")} onClick={() => selectProject([])}>All</li>
          <li className={project_type_selection + (active === "featured" ? activeStyle : "")} onClick={() => selectFeatured()}>Featured</li>
          <li className={project_type_selection + (active === "React" ? activeStyle : "")} onClick={() => selectProject(["React", "Preact"])}>React / Preact</li>
          <li className={project_type_selection + (active === "TypeScript" ? activeStyle : "")} onClick={() => selectProject(["TypeScript"])}>Typescript</li>
          <li className={project_type_selection + (active === "Java" ? activeStyle : "")} onClick={() => selectProject(["Java"])}>Java</li>
          <li className={project_type_selection + (active === "C++" ? activeStyle : "")} onClick={() => selectProject(["C++"])}>C++</li>
          <li className={project_type_selection + (active === "WebAssembly" ? activeStyle : "")} onClick={() => selectProject(["WebAssembly"])}>WebAssembly</li>
          <li className={project_type_selection + (active === "Javascript" ? activeStyle : "")} onClick={() => selectProject(["Javascript"])}>Vanilla JS</li>
        </ul>

      </div>

    </nav>
  )
}