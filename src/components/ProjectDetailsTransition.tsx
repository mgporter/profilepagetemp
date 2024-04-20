import { MutableRef, useLayoutEffect, useRef, useState } from "preact/hooks";
import { Project } from "./PROJECTS";
import ProjectDetailsMovingImg from "./ProjectDetailsMovingImg";

interface ProjectDetailsTransitionProps {
  thumbnailDiv: HTMLElement;
  project: Project;
  containerRef: MutableRef<HTMLDivElement>;
  detailsPageRef: MutableRef<HTMLDivElement>;
}

const EMPTY_DOM_RECT: DOMRect = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  bottom: 0,
  top: 0,
  right: 0,
  left: 0,
  toJSON: () => {}
}

export default function ProjectDetailsTransition({thumbnailDiv, project, containerRef, detailsPageRef}: ProjectDetailsTransitionProps) {

  const bubbleRef = useRef<HTMLDivElement>(null!);
  const [containerRect, setContainerRect] = useState(EMPTY_DOM_RECT);
  const [thumbnailRect, setThumbnailRect] = useState(EMPTY_DOM_RECT);
  const [placeholderImgRect, setPlaceholderImgRect] = useState(EMPTY_DOM_RECT);
  const [showMovingImg, setShowMovingImg] = useState(false);
  
  useLayoutEffect(() => {
    console.log("TRANSITION use layout effect")

    const mainRect = containerRef.current.getBoundingClientRect();
    const thumbnailDivRect = thumbnailDiv.getBoundingClientRect();
    const placeholderImg = detailsPageRef.current.querySelector("img.details_placeholder_image");
    if (placeholderImg instanceof HTMLImageElement) {
      setPlaceholderImgRect(placeholderImg.getBoundingClientRect());
    }

    const oldHeight = containerRef.current.style.height;
    containerRef.current.style.height = "";
    containerRef.current.style.height = containerRef.current.scrollHeight + "px";


    setContainerRect(mainRect);
    setThumbnailRect(thumbnailDivRect);

    setShowMovingImg(true);

    return () => {
      containerRef.current.style.height = oldHeight;   // return the height back to it's original settings
    }
  }, [])

  const centerXPercent = ((thumbnailRect.left + (thumbnailRect.width / 2) + window.scrollX) / document.body.scrollWidth) * 100;
  const centerYPercent = ((thumbnailRect.top + (thumbnailRect.height / 2) + window.scrollY) / document.body.scrollHeight) * 100;
  
  document.documentElement.style.cssText = 
    `--bubble-pos-x: ${centerXPercent}%; --bubble-pos-y: ${centerYPercent}%;`;

  const bubbleStyle = {
    left: -containerRect.left - window.scrollX,
    top: -containerRect.top - window.scrollY,   
    width: document.body.scrollWidth,
    height: document.body.scrollHeight,
    clipPath: `circle(8% at ${centerXPercent}% ${centerYPercent}%)`,
  }

  return (
    <>
      {/* <div className="bg-red-600 z-[200] size-8 rounded-full absolute"
        style={{left: relativeLeft, top: relativeTop}}></div> */}

      <div className="project_details_bubble bubblegrow absolute z-[100] size-[32px]"
        style={bubbleStyle}
        ref={bubbleRef}>
      </div>
      
      {showMovingImg &&
        <ProjectDetailsMovingImg 
          placeholderImgRect={placeholderImgRect} 
          thumbnailRect={thumbnailRect} 
          containerRect={containerRect}
          project={project} />}

    </>

  )
}