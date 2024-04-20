import { MutableRef, useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { Project } from "./PROJECTS";
import { ProjectDetailsPage } from "./ProjectDetailsPage";
import { CSSProperties } from "preact/compat";
import ProjectDetailsTransition from "./ProjectDetailsTransition";

export interface DetailsProp {
  project: Project;
  thumbnailDiv: HTMLElement;
}

export interface ProjectDetailsProps {
  details: DetailsProp;
  containerRef: MutableRef<HTMLDivElement>;
  closeDetails: () => void;
}

export default function ProjectDetails({details, containerRef, closeDetails}: ProjectDetailsProps) {

  const detailsPageRef = useRef<HTMLImageElement>(null!);

  const [ready, setReady] = useState(false);

  function pageContentReady() {
    setReady(true);
  }

  return (
    <>
      {ready && 
        <ProjectDetailsTransition 
          thumbnailDiv={details.thumbnailDiv}
          project={details.project}
          containerRef={containerRef}
          detailsPageRef={detailsPageRef} />}

      <ProjectDetailsPage 
        ref={detailsPageRef} 
        project={details.project} 
        closeDetails={closeDetails} 
        onComponentLoad={pageContentReady} />
    </>

  )
}