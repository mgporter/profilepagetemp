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
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  // Get coordinates of the large image (which is set to opacity=0), and calculate
  // the transforms in order to make the small image's size and position match.
  // The small image's transition property will handle the transition. 
  // useLayoutEffect(() => {
  //   console.log("useLayoutEffect")
  //   const newContainerRect = containerRef.current.getBoundingClientRect();
  //   setContainerRect(newContainerRect);
  //   setReady(true);

    // largeImgRef.current.onload = () => {
    //   const { left: imgLeft, top: imgTop, width: imgWidth, height: imgHeight } = largeImgRef.current.getBoundingClientRect();
    //   const placeholderCenterX = imgLeft + (imgWidth / 2) - mainLeft;
    //   const placeholderCenterY = imgTop + (imgHeight / 2) - mainTop;
    //   const movingImgLeft = placeholderCenterX - (movingImgStyle.width / 2);
    //   const movingImgTop = placeholderCenterY - (movingImgStyle.height / 2);
    //   const scaleFactorX = imgWidth / movingImgStyle.width;
  
    //   const translateX = (movingImgLeft - movingImgStyle.left) / scaleFactorX;
    //   const translateY = (movingImgTop - movingImgStyle.top) / scaleFactorX;
  
    //   const newHeight = movingImgStyle.width * imgHeight / imgWidth;
    //   const heightDifference = (newHeight - movingImgStyle.height) / (scaleFactorX * 2);
  
    //   movingImgRef.current.style.transform = `scale(${scaleFactorX}) translate(${translateX}px, ${translateY - heightDifference}px)`;
    //   movingImgRef.current.style.height = newHeight + "px"; // Used to bring aspect ratio back to its original
    //   movingImgRef.current.style.borderRadius = "0.375rem";
    // }

  // }, [])

  // useEffect(() => {
  //   const obs = new ResizeObserver(() => {
  //     const { left: anotherLeft, top: mainTop } = containerRef.current.getBoundingClientRect();
  //     console.log(anotherLeft * -1 - window.scrollX)
  //     bubbleRef.current.style.left = `${anotherLeft * -1 - window.scrollX}px`;
  //     bubbleRef.current.style.top = `${mainTop * -1 - window.scrollY}px`;
  //   })
  //   obs.observe(document.body);
  //   return () => {
  //     obs.unobserve(document.body);
  //   }
  // }, [])

  function pageContentReady() {
    // const detailsPageRect = detailsPageRef.current.getBoundingClientRect();
    // containerRef.current.style.height = `${detailsPageRect.height}px`;
    console.log("pageContentLoaded")
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