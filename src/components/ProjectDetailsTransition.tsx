import { MutableRef, useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import ProjectDetailsMovingImg from "./ProjectDetailsMovingImg";
import { ComponentChildren } from "preact";

interface ProjectDetailsTransitionProps {
  thumbnailDiv: HTMLElement;
  children: ComponentChildren;
  containerRef: MutableRef<HTMLDivElement>;
  detailsPageRef: MutableRef<HTMLDivElement>;
  onEffectComplete: () => void;
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

export default function ProjectDetailsTransition({
  thumbnailDiv, 
  children, 
  containerRef, 
  detailsPageRef,
  onEffectComplete}: ProjectDetailsTransitionProps) {

  const bubbleRef = useRef<HTMLDivElement>(null!);
  const [containerRect, setContainerRect] = useState(EMPTY_DOM_RECT);
  const [thumbnailRect, setThumbnailRect] = useState(EMPTY_DOM_RECT);
  const [placeholderImgRect, setPlaceholderImgRect] = useState(EMPTY_DOM_RECT);
  const [showMovingImg, setShowMovingImg] = useState(false);
  
  useLayoutEffect(() => {

    const mainRect = containerRef.current.getBoundingClientRect();
    const thumbnailDivRect = thumbnailDiv.getBoundingClientRect();
    const placeholderImgTemp = detailsPageRef.current.querySelector("img.details_placeholder_image");

    if (placeholderImgTemp instanceof HTMLImageElement) {
      setPlaceholderImgRect(placeholderImgTemp.getBoundingClientRect());
      setShowMovingImg(true);
    }

    // Set height of main element to the content height
    const oldHeight = containerRef.current.style.height;
    containerRef.current.style.height = "";
    containerRef.current.style.height = containerRef.current.scrollHeight + "px";

    setContainerRect(mainRect);
    setThumbnailRect(thumbnailDivRect);
    

    return () => {
      // return main's height to its original settings
      containerRef.current.style.height = oldHeight;   
    }
  }, [])

  // Ensure that the "bubble" always matches the size of the document body
  useEffect(() => {

    function updateBubbleDimensions() {
      const {left, top} = containerRef.current.getBoundingClientRect();
      bubbleRef.current.style.left = `${-left - window.scrollX}px`;
      bubbleRef.current.style.top = `${-top - window.scrollY}px`;
      bubbleRef.current.style.width = `${document.body.scrollWidth}px`;
      bubbleRef.current.style.height = `${document.body.scrollHeight}px`;
    }

    window.addEventListener("resize", updateBubbleDimensions);

    return () => {
      window.removeEventListener("resize", updateBubbleDimensions);
    }

  }, [])

  const centerXPercent = 
    ((thumbnailRect.left + (thumbnailRect.width / 2) + window.scrollX) / document.body.scrollWidth) * 100;
  const centerYPercent = 
    ((thumbnailRect.top + (thumbnailRect.height / 2) + window.scrollY) / document.body.scrollHeight) * 100;
  
  const root = document.querySelector(':root');
  if (root instanceof HTMLElement) {
    root.style.setProperty("--bubble-pos-x", centerXPercent + "%");
    root.style.setProperty("--bubble-pos-y", centerYPercent + "%");
  }

  const bubbleStyle = {
    left: -containerRect.left - window.scrollX,
    top: -containerRect.top - window.scrollY,   
    width: document.body.scrollWidth,
    height: document.body.scrollHeight,
    clipPath: `circle(8% at ${centerXPercent}% ${centerYPercent}%)`,
  }

  return (
    <>

      <div className="project_details_bubble bubblegrow absolute z-[100] size-[32px]"
        style={bubbleStyle}
        ref={bubbleRef}>
      </div>
      
      {showMovingImg &&
        <ProjectDetailsMovingImg 
          placeholderImgRect={placeholderImgRect}
          thumbnailRect={thumbnailRect} 
          containerRect={containerRect}
          onEffectComplete={onEffectComplete}>
          {children}
        </ProjectDetailsMovingImg>}

    </>

  )
}