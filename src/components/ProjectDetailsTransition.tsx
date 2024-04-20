import { MutableRef, useLayoutEffect, useRef, useState } from "preact/hooks";
import { Project } from "./PROJECTS";

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

  const movingImgRef = useRef<HTMLImageElement>(null!);
  const bubbleRef = useRef<HTMLDivElement>(null!);
  const [containerRect, setContainerRect] = useState(EMPTY_DOM_RECT);
  const [detailsPageRect, setDetailsPageRect] = useState(EMPTY_DOM_RECT);
  const [thumbnailRect, setThumbnailRect] = useState(EMPTY_DOM_RECT);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  
  useLayoutEffect(() => {
    console.log("TRANSITION use layout effect")
    setContainerRect(containerRef.current.getBoundingClientRect());
    setDetailsPageRect(detailsPageRef.current.getBoundingClientRect());
    setThumbnailRect(thumbnailDiv.getBoundingClientRect());
  }, [])

  const relativeLeft = thumbnailRect.left - containerRect.left;
  const relativeTop = thumbnailRect.top - containerRect.top;

  console.log("render TRANSITION")
  const centerXPercent = ((thumbnailRect.left + (thumbnailRect.width / 2)) / document.body.scrollWidth) * 100;
  const centerYPercent = ((thumbnailRect.top + (thumbnailRect.height / 2)) / document.body.scrollHeight) * 100;
  
  document.documentElement.style.cssText = 
    `--bubble-pos-x: ${centerXPercent}%; --bubble-pos-y: ${centerYPercent}%;`;

  // For position relative to viewport
  // const bubbleStyle = {
  //   left: 0,
  //   top: 0,   
  //   width: document.body.scrollWidth,
  //   height: document.body.scrollHeight,
  //   clipPath: `circle(8% at ${centerXPercent}% ${centerYPercent}%)`,
  // }

  const bubbleStyle = {
    left: -containerRect.left,
    top: -containerRect.top,   
    width: document.body.scrollWidth,
    height: document.body.scrollHeight,
    clipPath: `circle(8% at ${centerXPercent}% ${centerYPercent}%)`,
  }

  const movingImgStyle = {
    left: relativeLeft, 
    top: relativeTop, 
    width: thumbnailRect.width, 
    height: thumbnailRect.height,
  }

  return (
    <>
      <div className="bg-red-600 z-[200] size-8 rounded-full fixed"
        style={{left: document.body.offsetWidth -32, top: window.innerHeight - 32}}></div>

      <div className="project_details_bubble bubblegrow absolute z-[100] size-[32px]"
        style={bubbleStyle}
        ref={bubbleRef}>
      </div>

      <div ref={movingImgRef} className="absolute movingImg z-[120] overflow-clip" style={movingImgStyle}
        onTransitionEnd={(e) => (e.target as HTMLElement).style.transition = "none"}>
        <img src={project.imageSrc} alt={project.name} className="w-full aspect-auto"></img>
      </div>
    </>

  )
}