import { useEffect, useRef } from "preact/hooks";
import { ComponentChildren } from "preact";

interface ProjectDetailsMovingImgProps {
  placeholderImgRect: DOMRect;
  thumbnailRect: DOMRect;
  containerRect: DOMRect;
  onEffectComplete: () => void;
  children: ComponentChildren
}

export default function ProjectDetailsMovingImg({
  placeholderImgRect,
  thumbnailRect, 
  containerRect,
  onEffectComplete,
  children}: ProjectDetailsMovingImgProps) {

  const movingImgRef = useRef<HTMLImageElement>(null!);

  useEffect(() => {
    const { left: imgLeft, top: imgTop, width: imgWidth, height: imgHeight } = placeholderImgRect;
    console.log(placeholderImgRect)

    const placeholderCenterX = imgLeft + (imgWidth / 2) - containerRect.left;
    const placeholderCenterY = imgTop + (imgHeight / 2) - containerRect.top;
    const movingImgLeft = placeholderCenterX - (movingImgStyle.width / 2);
    const movingImgTop = placeholderCenterY - (movingImgStyle.height / 2);
    const scaleFactorX = imgWidth / movingImgStyle.width;
  
    const translateX = (movingImgLeft - movingImgStyle.left) / scaleFactorX;
    const translateY = (movingImgTop - movingImgStyle.top) / scaleFactorX;
  
    const newHeight = movingImgStyle.width * imgHeight / imgWidth;
    const heightDifference = (newHeight - movingImgStyle.height) / (scaleFactorX * 2);

    const root = document.querySelector(':root');
    if (root instanceof HTMLElement) {
      root.style.setProperty("--moving_img_scale", scaleFactorX + "");
      root.style.setProperty("--moving_img_translateX", translateX + "px");
      root.style.setProperty("--moving_img_translateY", (translateY - heightDifference) + "px");
      root.style.setProperty("--moving_img_orig_height", thumbnailRect.height + "px");
      root.style.setProperty("--moving_img_height", newHeight + "px");
      root.style.setProperty("--moving_img_borderradius", "0.15rem");
    }

    movingImgRef.current.classList.add("movingImg");
    
    // scroll window to top automatically if user is scrolled too far down
    if (window.scrollY > placeholderCenterY) {
      window.scrollTo({top: containerRect.top + window.scrollY, left: 0, behavior: "instant"});
    }

  }, [])

  function movingImgTransitionEnd(e: AnimationEvent) {
    if (e.target instanceof HTMLElement) {
      e.target.remove();
      onEffectComplete();
    }
  }

  const movingImgStyle = {
    left: thumbnailRect.left - containerRect.left, 
    top: thumbnailRect.top - containerRect.top, 
    width: thumbnailRect.width, 
    height: thumbnailRect.height,
  }

  return (
    <div ref={movingImgRef} className="absolute z-[120] overflow-hidden" style={movingImgStyle}
      onAnimationEnd={movingImgTransitionEnd}>
      {children}
      {/* <img src={project.imageSrc} alt={project.name} className="w-full aspect-auto"></img> */}
    </div>
  )
}