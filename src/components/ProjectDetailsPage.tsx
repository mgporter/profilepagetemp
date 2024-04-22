import { ForwardedRef, forwardRef, useRef, useState } from "preact/compat"
import { Project } from "./PROJECTS";
import ProjectDetailsControls from "./ProjectDetailsControls";

interface ProjectDetailsPageProps {
  projectIndex: number;
  projectArray: Project[];
  closeDetails: () => void;
  onComponentLoad: () => void;
}

  // const placeholderCanvas = useMemo(() => {
  //   const canvas = document.createElement('canvas');
  //   canvas.width = project.imageDimensions[0];
  //   canvas.height = project.imageDimensions[1];
  
  //   const ctx = canvas.getContext('2d');
  //   if (ctx) {
  //     ctx.fillStyle = 'rgba(0,0,0,0)';
  //     ctx.fillRect(0, 0, project.imageDimensions[0], project.imageDimensions[1]);
  //   }

  //   return canvas;
  // }, [])

const projectLink = "transition-colors text-xl rounded-sm bg-blue-400/80 hover:bg-blue-700 ml-4 mb-1 px-4 py-1";

export const ProjectDetailsPage = forwardRef((props: ProjectDetailsPageProps, ref: ForwardedRef<HTMLDivElement>) => {

  const [index, setIndex] = useState(props.projectIndex);
  const pageContentRef = useRef<HTMLDivElement>(null!);

  const limit = props.projectArray.length;
  const project = props.projectArray[index];

  const prevIndex = (index + limit - 1) % limit;
  const nextIndex = (index + 1) % limit;


  return (
    <div className="project_details_content project_delayed_fadein absolute z-[110] inset-0
       pt-4 px-2 items-stretch"
       ref={ref}>
      
      <ProjectDetailsControls
        index={{cur: index, prev: prevIndex, next: nextIndex}}
        projectArray={props.projectArray}
        setIndex={setIndex}
        pageContentRef={pageContentRef}
        closeDetails={props.closeDetails}
      />

      <div className="project_details_inner flex flex-col gap-4 items-stretch" ref={pageContentRef}>

        <div className="flex flex-col mx-4 gap-2 w-full px-2">
          <h1 className="text-4xl font-bold text-blue-200">{project.name} 
            {project.featured && <span className="text-xl ml-3 text-yellow-200/90">(featured)</span>}
          </h1>
          <h2>{project.heading}</h2>
        </div>

        <ul className="mx-16 sm:ml-6 sm:mr-2 max-w-[30rem] list-['\21E8\0020\0020']">
          {project.livePreviewUrl && <a href={project.livePreviewUrl} target="_blank"><li className={projectLink}>Go to live preview</li></a>}
          <a href={project.sourceUrl} target="_blank"><li className={projectLink}>View the source on Github</li></a>
        </ul>

        <img 
          src={project.imageSrc} 
          className="details_placeholder_image w-3/4 rounded-md self-center opacity-0" 
          onLoad={props.onComponentLoad}
          style={{aspectRatio: project.imageDimensions[0] / project.imageDimensions[1]}}></img>
        {/* <img src={placeholderCanvas.toDataURL()} className="details_placeholder_image w-3/4 self-center"></img> */}

        <ul className="flex items-center bg-indigo-950 border-t border-indigo-600 mx-8 sm:mx-2 flex-wrap mb-4 p-2 gap-4">
          <li className="px-2 font-bold">Tech stack:</li>
          {project.types.map(type => (
            <li className=" bg-slate-300 text-black px-2 py-1 rounded-md font-medium">{type}</li>
          ))}
        </ul>
        
        <div className="flex flex-col gap-4 pb-64 ">
          {project.description}
        </div>

      </div>
      



    </div>
  )
})