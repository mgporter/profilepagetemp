import { useEffect, useRef } from "preact/hooks";
import { Project } from "./PROJECTS";

interface ProjectDetailsMovingImgProps {
  placeholderImgRect: DOMRect;
  thumbnailRect: DOMRect;
  containerRect: DOMRect;
  project: Project;
}

export default function ProjectDetailsMovingImg({placeholderImgRect, thumbnailRect, containerRect, project}: ProjectDetailsMovingImgProps) {

  const movingImgRef = useRef<HTMLImageElement>(null!);

  useEffect(() => {
    const { left: imgLeft, top: imgTop, width: imgWidth, height: imgHeight } = placeholderImgRect;

    const placeholderCenterX = imgLeft + (imgWidth / 2) - containerRect.left;
    const placeholderCenterY = imgTop + (imgHeight / 2) - containerRect.top;
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
  }, [])

  const movingImgStyle = {
    left: thumbnailRect.left - containerRect.left, 
    top: thumbnailRect.top - containerRect.top, 
    width: thumbnailRect.width, 
    height: thumbnailRect.height,
  }

  return (
    <div ref={movingImgRef} className="absolute movingImg z-[120] overflow-clip" style={movingImgStyle}
      onTransitionEnd={(e) => (e.target as HTMLElement).style.transition = "none"}>
      <img src={project.imageSrc} alt={project.name} className="w-full aspect-auto"></img>
    </div>
  )
}