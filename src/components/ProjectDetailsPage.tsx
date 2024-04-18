import { ForwardedRef, forwardRef } from "preact/compat"
import Xicon from "../images/X_icon.svg"
import { Project } from "./PROJECTS";

interface ProjectDetailsPageProps {
  project: Project;
  closeDetails: () => void;
}

const projectLink = "transition-colors rounded-sm hover:bg-blue-700";

export const ProjectDetailsPage = forwardRef((props: ProjectDetailsPageProps, ref: ForwardedRef<HTMLImageElement>) => {

  const project = props.project;

  return (
    <div className="project_details_content project_delayed_fadein absolute z-[110] inset-0 py-6 px-2
    flex flex-col gap-4 items-stretch">
    
    <div 
      className="absolute flex items-center gap-2 top-2 right-1 cursor-pointer"
      onClick={props.closeDetails}>
      <span className="text-2xl text-orange-900 hover:text-orange-500">Close</span>
      <img src={Xicon} className="invert h-8"></img>
    </div>
    
    <div className="flex flex-col mx-4 gap-2 w-full">
      <h1 className="text-4xl">{project.name}</h1>
      <h2>{project.heading}</h2>
      <ul className="mx-12 max-w-[30rem] list-item list-disc list-inside">
        {project.livePreviewUrl && <li className={projectLink}><a href={project.livePreviewUrl} target="_blank">Go to live preview</a></li>}
        <li className={projectLink}><a href={project.sourceUrl} target="_blank">View the source on Github</a></li>
      </ul>
    </div>

    {/* This marks the final location of the movingImg. It is not shown directly. */}
    <img ref={ref} src={project.imageSrc} alt={project.name} className="rounded-md opacity-0"></img>

    <ul className="flex bg-white/10 mx-8 p-2 gap-4">
      {project.types.map(type => (
        <li className="bg-sky-300/30 px-2 py-1 rounded-md">{type}</li>
      ))}
    </ul>

    {project.description}
  </div>
  )
})