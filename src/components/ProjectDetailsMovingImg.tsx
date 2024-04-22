import { useEffect, useRef } from "preact/hooks";
import { ComponentChildren } from "preact";
import { dispatcher } from "./Dispatcher";

interface ProjectDetailsMovingImgProps {
  placeholderImgRect: DOMRect;
  placeholderImg: HTMLImageElement;
  thumbnailRect: DOMRect;
  containerRect: DOMRect;
  children: ComponentChildren
}

export default function ProjectDetailsMovingImg({
  placeholderImgRect, 
  placeholderImg,
  thumbnailRect, 
  containerRect,
  children}: ProjectDetailsMovingImgProps) {

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
    movingImgRef.current.style.borderRadius = "0.15rem";

    console.log(containerRect);
    console.log(window.scrollY);

    // scroll window to top automatically if user is scrolled too far down
    if (window.scrollY > placeholderCenterY) {
      window.scrollTo({top: containerRect.top + window.scrollY, left: 0, behavior: "instant"});
    }

  }, [])

  function movingImgTransitionEnd(e: TransitionEvent) {
    // When the movingImg finishes its animation, remove it to
    // reveal the placeholderImg underneath.
    if (e.target instanceof HTMLElement) {
      placeholderImg.style.opacity = "1";
      e.target.remove();
      dispatcher.dispatch("enableProjectControls", true);
    }
  }

  const movingImgStyle = {
    left: thumbnailRect.left - containerRect.left, 
    top: thumbnailRect.top - containerRect.top, 
    width: thumbnailRect.width, 
    height: thumbnailRect.height,
  }

  return (
    <div ref={movingImgRef} className="absolute movingImg z-[120] overflow-clip" style={movingImgStyle}
      onTransitionEnd={movingImgTransitionEnd}>
      {children}
      {/* <img src={project.imageSrc} alt={project.name} className="w-full aspect-auto"></img> */}
    </div>
  )
}