import { ForwardedRef, forwardRef, useEffect, useRef } from "preact/compat"
import { Project } from "./PROJECTS";

interface ProjectDetailsPageProps {
  project: Project;
  closeDetails: () => void;
}

const projectLink = "transition-colors text-xl rounded-sm bg-white/10 hover:bg-blue-700 ml-4 mb-1 px-4 py-1";

export const ProjectDetailsPage = forwardRef((props: ProjectDetailsPageProps, ref: ForwardedRef<HTMLImageElement>) => {

  const pageRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      const oldHeight = main.style.height;
      main.style.height = `${pageRef.current.scrollHeight}px`;
      return () => {
        main.style.height = oldHeight;
      }
    }
  }, []);

  const project = props.project;

  return (
    <div className="project_details_content project_delayed_fadein absolute z-[110] inset-0
       pt-16 px-2 flex flex-col gap-4 items-stretch"
       ref={pageRef}>
    
      <div 
        className="group absolute flex items-center gap-2 top-2 right-4 cursor-pointer px-3 rounded-xl
          transition-colors text-orange-900 hover:text-orange-500
          border-2 border-transparent hover:border-orange-900"
        onClick={props.closeDetails}>
        <span className="text-2xl">Close</span>
        <p className="text-5xl pb-2 my-[-6px]">×</p>
      </div>
      
      <div className="flex flex-col mx-4 gap-2 w-full">
        <h1 className="text-4xl font-bold text-blue-200">{project.name}</h1>
        <h2 className="text-gray-200">{project.heading}</h2>
      </div>

      <ul className="mx-16 max-w-[30rem] list-['\21E8\0020\0020']">
        {project.livePreviewUrl && <a href={project.livePreviewUrl} target="_blank"><li className={projectLink}>Go to live preview</li></a>}
        <a href={project.sourceUrl} target="_blank"><li className={projectLink}>View the source on Github</li></a>
      </ul>

      {/* This marks the final location of the movingImg. It is not shown directly. */}
      <img ref={ref} src={project.imageSrc} alt={project.name} className="opacity-0"></img>

      <ul className="flex items-center bg-white/10 mx-8 sm:mx-2 flex-wrap mb-4 p-2 gap-4">
        <li className="px-2">Tech stack:</li>
        {project.types.map(type => (
          <li className="bg-sky-300/30 px-2 py-1 rounded-md">{type}</li>
        ))}
      </ul>
      
      <div className="flex flex-col gap-4 pb-64 ">
        {project.description}
      </div>


    </div>
  )
})