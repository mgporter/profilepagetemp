import { MutableRef, useEffect, useLayoutEffect, useRef } from "preact/hooks";
import { Project } from "./PROJECTS";
import { ProjectDetailsPage } from "./ProjectDetailsPage";
import { CSSProperties } from "preact/compat";

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
  const bubbleRef = useRef<HTMLDivElement>(null!);

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



  const rect = details.thumbnailRect;

  const { left: mainLeft, top: mainTop, height: mainHeight } = containerRef.current.getBoundingClientRect();

  const centerX = ((rect.left + (rect.width / 2)) + window.scrollX) / window.innerWidth;
  const centerY = ((rect.top + (rect.height / 2)) + window.scrollY) / window.innerHeight;
  
  console.log(mainLeft * -1 - window.scrollX)
  document.documentElement.style.cssText = 
    `--bubble-pos-x: ${centerX * 100}%; --bubble-pos-y: ${centerY * 100}%;`;

  

  const bubbleStyle: CSSProperties = {
    left: mainLeft * -1 - window.scrollX,
    top: mainTop * -1 - window.scrollY,   
    width: document.body.scrollWidth,
    height: document.body.scrollHeight,
    clipPath: `circle(1% at ${centerX * 100}% ${centerY * 100}%)`,
  }

  

  const movingImgStyle = {
    left: rect.left - mainLeft, 
    top: rect.top - mainTop, 
    width: rect.width, 
    height: rect.height,
  }

  return (
    <>
      <div className="bg-red-600 z-[200] size-8 rounded-full absolute"
        style={{left: (rect.left + (rect.width / 2)), top: (rect.top + (rect.height / 2))}}></div>

      <div className="project_details_bubble bubblegrow absolute z-[100] size-[32px]"
        style={bubbleStyle}
        ref={bubbleRef}>
      </div>

      <div ref={movingImgRef} className="absolute movingImg z-[120] overflow-clip" style={movingImgStyle}
        onTransitionEnd={(e) => (e.target as HTMLElement).style.transition = "none"}>
        <img src={details.project.imageSrc} alt={details.project.name} className="w-full aspect-auto"></img>
      </div>

      <ProjectDetailsPage ref={largeImgRef} project={details.project} closeDetails={closeDetails} />
    
    </>

  )
}