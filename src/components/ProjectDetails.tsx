import { MutableRef, useLayoutEffect, useRef } from "preact/hooks";
import { Project } from "./PROJECTS";
import { ProjectDetailsPage } from "./ProjectDetailsPage";

export interface DetailsProp {
  project: Project;
  thumbnailRect: DOMRect;
}

export interface ProjectDetailsProps {
  details: DetailsProp;
  containerRef: MutableRef<HTMLDivElement>;
  closeDetails: () => void;
}

export default function ProjectDetails({details, containerRef, closeDetails}: ProjectDetailsProps) {

  const largeImgRef = useRef<HTMLImageElement>(null!);
  const movingImgRef = useRef<HTMLImageElement>(null!);

  // Get coordinates of the large image (which is set to opacity=0), and calculate
  // the transforms in order to make the small image's size and position match.
  // The small image's transition property will handle the transition. 
  useLayoutEffect(() => {
    largeImgRef.current.onload = () => {
      const { left: imgLeft, top: imgTop, width: imgWidth, height: imgHeight } = largeImgRef.current.getBoundingClientRect();
      const placeholderCenterX = imgLeft + (imgWidth / 2) - mainLeft;
      const placeholderCenterY = imgTop + (imgHeight / 2) - mainTop;
      const movingImgLeft = placeholderCenterX - (movingImgStyle.width / 2);
      const movingImgTop = placeholderCenterY - (movingImgStyle.height / 2);
      const scaleFactorX = imgWidth / movingImgStyle.width;
  
      const translateX = (movingImgLeft - movingImgStyle.left) / scaleFactorX;
      const translateY = (movingImgTop - movingImgStyle.top) / scaleFactorX;
  
      const newHeight = movingImgStyle.width * imgHeight / imgWidth;
      const heightDifference = (newHeight - movingImgStyle.height) / (scaleFactorX * 2);
  
      movingImgRef.current.style.transform = `scale(${scaleFactorX}) translate(${translateX}px, ${translateY - heightDifference}px)`;
      movingImgRef.current.style.height = newHeight + "px"; // Used to bring aspect ratio back to its original
      movingImgRef.current.style.borderRadius = "0.375rem";
    }

  }, [])

  const rect = details.thumbnailRect;

  const { left: mainLeft, top: mainTop, height: mainHeight } = containerRef.current.getBoundingClientRect();
  const BUBBLE_MAX_SIZE = mainHeight * 2; 
  
  const bubbleStyle = {
    left: (rect.left + (rect.width / 2)) - (BUBBLE_MAX_SIZE / 2) - mainLeft,
    top: (rect.top + (rect.height / 2)) - (BUBBLE_MAX_SIZE / 2) - mainTop,
    width: BUBBLE_MAX_SIZE,
    height: BUBBLE_MAX_SIZE,
  }

  const movingImgStyle = {
    left: rect.left - mainLeft, 
    top: rect.top - mainTop, 
    width: rect.width, 
    height: rect.height,
  }

  return (
    <>
      <div className="project_details_bubble absolute z-[100] bubblegrow size-[32px] rounded-[100%]"
        style={bubbleStyle}>
      </div>

      <div ref={movingImgRef} className="absolute movingImg z-[120] overflow-clip" style={movingImgStyle}
        onTransitionEnd={(e) => (e.target as HTMLElement).style.transition = "none"}>
        <img src={details.project.imageSrc} alt={details.project.name} className="w-full aspect-auto"></img>
      </div>

      <ProjectDetailsPage ref={largeImgRef} project={details.project} closeDetails={closeDetails} />
    
    </>

  )
}