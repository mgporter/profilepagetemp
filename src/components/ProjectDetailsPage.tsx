import { ForwardedRef, forwardRef, useEffect, useMemo } from "preact/compat"
import { Project } from "./PROJECTS";

interface ProjectDetailsPageProps {
  project: Project;
  closeDetails: () => void;
  onComponentLoad: () => void;
}

const projectLink = "transition-colors text-xl rounded-sm bg-white/10 hover:bg-blue-700 ml-4 mb-1 px-4 py-1";

export const ProjectDetailsPage = forwardRef((props: ProjectDetailsPageProps, ref: ForwardedRef<HTMLDivElement>) => {

  useEffect(() => {
    props.onComponentLoad();
  }, []);

  const project = props.project;

  const placeholderCanvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = project.imageDimensions[0];
    canvas.height = project.imageDimensions[1];
  
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, project.imageDimensions[0], project.imageDimensions[1]);
    }

    return canvas;
  }, [])

  return (
    <div className="project_details_content project_delayed_fadein absolute z-[110] inset-0
       pt-16 px-2 flex flex-col gap-4 items-stretch"
       ref={ref}>
    
      <div 
        className="group absolute flex items-center gap-2 top-2 right-4 cursor-pointer px-3 rounded-xl
          transition-colors text-orange-700 hover:text-orange-500 active:text-orange-500
          border-2 border-transparent hover:border-orange-800"
        onClick={props.closeDetails}>
        <span className="text-2xl">Close</span>
        <p className="text-5xl pb-2 my-[-6px]">×</p>
      </div>
      
      <div className="flex flex-col mx-4 gap-2 w-full">
        <h1 className="text-4xl font-bold text-blue-200">{project.name}</h1>
        <h2 className="text-gray-200">{project.heading}</h2>
      </div>

      <ul className="mx-16 sm:ml-6 sm:mr-2 max-w-[30rem] list-['\21E8\0020\0020']">
        {project.livePreviewUrl && <a href={project.livePreviewUrl} target="_blank"><li className={projectLink}>Go to live preview</li></a>}
        <a href={project.sourceUrl} target="_blank"><li className={projectLink}>View the source on Github</li></a>
      </ul>

      <img src={placeholderCanvas.toDataURL()} className="details_placeholder_image"></img>

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