import { useRef, useState } from "preact/compat"
import { Project } from "./PROJECTS";
import ProjectDetailsControls from "./ProjectDetailsControls";
import { VNode } from "preact";
import ProjectTransition from "./ProjectTransition";
import { MutableRef, useEffect } from "preact/hooks";
import { dispatcher } from "./Dispatcher";

interface ProjectDetailsPageProps {
  projectArray: Project[];
  projectDiv: HTMLElement;
  useTransition: boolean;
  containerRef: MutableRef<HTMLDivElement>;
  setProjectDiv: (a: HTMLElement | null) => void;
  setShowIconHolder: (a: boolean) => void;
}

async function preloadImage(url: string): Promise<VNode<HTMLImageElement>> {
  return <img src={url} className="preloaded_img absolute size-0 top-0 left-0 hidden"></img>
}

const projectLink = "transition-colors text-xl rounded-sm bg-blue-400/80 hover:bg-blue-700 ml-4 mb-1 px-4 py-1";

export default function ProjectDetailsPage({
  projectArray,
  projectDiv,
  useTransition,
  containerRef,
  setProjectDiv,
  setShowIconHolder,
}: ProjectDetailsPageProps) {

  const [index, setIndex] = useState(Number(projectDiv.dataset.id));
  const [startTransition, setStartTransition] = useState(false);
  const [isInitialOpening, setIsInitialOpening] = useState(true);
  const pageContentRef = useRef<HTMLDivElement>(null!);
  const projectImgRef = useRef<HTMLImageElement>(null!);
  const projectDetailsContainerRef = useRef<HTMLDivElement>(null!);
  const [preloadedImgs, setPreloadedImgs] = 
    useState<[VNode<HTMLImageElement>, VNode<HTMLImageElement>] | null>(null);

  useEffect(() => {
    if (isInitialOpening && !useTransition) {
      const { top: imageTop } = projectImgRef.current.getBoundingClientRect();
      if (window.scrollY > imageTop) {
        const { top: mainTop } = containerRef.current.getBoundingClientRect();
        window.scrollTo({top: mainTop + window.scrollY, left: 0, behavior: "instant"});
      }
      setIsInitialOpening(false);
    }
  }, [])

  const limit = projectArray.length;
  const project = projectArray[index];

  const prevIndex = (index + limit - 1) % limit;
  const nextIndex = (index + 1) % limit;

  let containerProps = "", mainImgProps = "";

  if (isInitialOpening && useTransition) {
    containerProps = "project_delayed_fadein absolute";
    mainImgProps = "invisible";
  }

  // Callback on end of transition, if it was started
  function onTransitionEnd() {
    projectDetailsContainerRef.current.style.position = "static";
    setIsInitialOpening(false);
    setShowIconHolder(false);
    dispatcher.dispatch("enableProjectControls", true);
  }

  function closeDetailsView() {
    setShowIconHolder(true);
    setProjectDiv(null);
  }

  console.log(isInitialOpening);

  function onMainImageLoad() {
    if (isInitialOpening && useTransition) setStartTransition(true);
    // if (isInitialOpening && !useTransition) setShowIconHolder(false);
    const img1 = preloadImage(projectArray[nextIndex].imageSrc);
    const img2 = preloadImage(projectArray[prevIndex].imageSrc);
    Promise.all([img1, img2]).then(result => {
      setPreloadedImgs([result[0], result[1]]);
    })
    
  }


  return (
    <>
      {startTransition && 
        <ProjectTransition
          thumbnailDiv={projectDiv} 
          containerRef={containerRef}
          projectImgRef={projectImgRef}
          onEffectComplete={onTransitionEnd}
          tempImage={<img 
            src={projectArray[index].imageSrc} 
            alt={projectArray[index].name} 
            className="w-full aspect-auto"></img>}
          />}

      <div className={`project_details_content z-[110] inset-0
        pt-8 px-2 items-stretch ${containerProps}`}
        ref={projectDetailsContainerRef}>
        
        <ProjectDetailsControls
          index={{cur: index, prev: prevIndex, next: nextIndex}}
          projectArray={projectArray}
          setIndex={setIndex}
          enableControls={!useTransition}
          pageContentRef={pageContentRef}
          closeDetails={closeDetailsView}
        />

        <div className="project_details_inner flex flex-col gap-4 items-stretch" ref={pageContentRef}>

          <div className="flex flex-col mx-4 vert:mx-0 gap-2 w-full px-2">
            <h1 className="text-4xl font-bold text-blue-200">{project.name} 
              {project.featured && <span className="text-xl ml-3 text-yellow-200/90">(featured)</span>}
            </h1>
            <h2>{project.heading}</h2>
          </div>

          <ul className="mx-16 vert:mx-8 max-w-[30rem] list-['\21E8\0020\0020']">
            {project.livePreviewUrl && <a href={project.livePreviewUrl} target="_blank"><li className={projectLink}>Go to live preview</li></a>}
            <a href={project.sourceUrl} target="_blank"><li className={projectLink}>View the source on Github</li></a>
          </ul>

          <img 
            src={project.imageSrc}
            ref={projectImgRef} 
            className={`details_placeholder_image w-3/4 rounded-md self-center ${mainImgProps}`} 
            onLoad={onMainImageLoad}
            width={project.imageDimensions[0] + ""}
            height={project.imageDimensions[1] + ""}
            style={{aspectRatio: project.imageDimensions[0] / project.imageDimensions[1]}}></img>

          <ul className="flex items-center bg-indigo-950 border-t border-indigo-600 
            mx-8 vert:mx-0 flex-wrap mb-4 p-2 gap-4">
            <li className="px-2 font-bold">Tech stack:</li>
            {project.types.map(type => (
              <li className=" bg-slate-300 text-black px-2 py-1 rounded-md font-medium">{type}</li>
            ))}
          </ul>
          
          <div className="flex flex-col gap-4 pb-64 ">
            {project.description}
          </div>

        </div>
        
        {/* Add preloaded images */}
        {preloadedImgs && 
          <>
            {preloadedImgs[0]}
            {preloadedImgs[1]}
          </>}

      </div>
    
    </>
    
  )
}