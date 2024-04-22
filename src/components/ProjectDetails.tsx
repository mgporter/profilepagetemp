import { MutableRef, useRef, useState } from "preact/hooks";
import { Project } from "./PROJECTS";
import { ProjectDetailsPage } from "./ProjectDetailsPage";
import ProjectDetailsTransition from "./ProjectDetailsTransition";
import { dispatcher } from "./Dispatcher";

export interface DetailsProp {
  projectIndex: number;
  thumbnailDiv: HTMLElement;
}

export interface ProjectDetailsProps {
  projectArray: Project[];
  details: DetailsProp;
  containerRef: MutableRef<HTMLDivElement>;
  closeDetails: () => void;
}

export default function ProjectDetails({
  projectArray,
  details, 
  containerRef, 
  closeDetails}: ProjectDetailsProps) {

  const detailsPageRef = useRef<HTMLImageElement>(null!);

  const [ready, setReady] = useState(false);

  function onEffectComplete() {

    const placeholderImg = detailsPageRef.current.querySelector(".details_placeholder_image");
    if (placeholderImg instanceof HTMLElement) {
      placeholderImg.style.visibility = "visible";
    }

    dispatcher.dispatch("enableProjectControls", true);
    dispatcher.dispatch("showProjectIcons", false);
  }

  function pageContentReady() {
    setReady(true);
  }

  return (
    <>
      {ready && 
        <ProjectDetailsTransition 
          thumbnailDiv={details.thumbnailDiv}
          containerRef={containerRef}
          detailsPageRef={detailsPageRef}
          onEffectComplete={onEffectComplete}> 
          <img 
            src={projectArray[details.projectIndex].imageSrc} 
            alt={projectArray[details.projectIndex].name} 
            className="w-full aspect-auto"></img>
        </ProjectDetailsTransition>}

      <ProjectDetailsPage 
        ref={detailsPageRef} 
        projectArray={projectArray}
        projectIndex={details.projectIndex} 
        closeDetails={closeDetails} 
        onComponentLoad={pageContentReady} />
    </>

  )
}