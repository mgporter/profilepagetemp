import { MutableRef, useEffect, useState } from "preact/hooks";
import { Project } from "./PROJECTS";
import { dispatcher } from "./Dispatcher";

interface ProjectDetailsControlsProps {
  index: {cur: number, prev: number, next: number};
  projectArray: Project[];
  setIndex: (a: number) => void;
  pageContentRef: MutableRef<HTMLDivElement>;
  closeDetails: () => void;
}

const controlStyle = 
  "group flex items-center gap-2 cursor-pointer px-3 rounded-xl font-bold text-2xl \
  transition-colors text-indigo-50/90 hover:text-yellow-200 \
  active:bg-sky-300/30 \
  border-2 border-transparent hover:border-yellow-200/40"

export default function ProjectDetailsControls({
  index,
  projectArray,
  setIndex, 
  pageContentRef, 
  closeDetails}: ProjectDetailsControlsProps) {

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const unsubscribe = dispatcher.subscribe("enableProjectControls", (val) => {
      setEnabled(val);
    });

    return unsubscribe;
  }, [])

  function swipe(action: "goforward" | "goback") {
    // setDisabled(true);
    dispatcher.dispatch("enableProjectControls", false);

    let newIndex, enterAction, exitAction;

    if (action === "goforward") {
      newIndex = index.next;
      exitAction = "swipe_exit_left";
      enterAction = "swipe_enter_right";
    } else {
      newIndex = index.prev;
      exitAction = "swipe_exit_right";
      enterAction = "swipe_enter_left";
    }

    pageContentRef.current.onanimationend = (e) => {
      if ((e.target as HTMLElement).className.includes("project_details_inner")) {
        pageContentRef.current.classList.remove(exitAction);

        pageContentRef.current.onanimationend = (e) => {
          if ((e.target as HTMLElement).className.includes("project_details_inner")) {
            pageContentRef.current.classList.remove(enterAction);
            dispatcher.dispatch("enableProjectControls", true);
          }
          // setTimeout(() => {
          //   setDisabled(false);
          // }, 500);  
        }
        pageContentRef.current.classList.add(enterAction);

        setIndex(newIndex);
      }
    };

    pageContentRef.current.classList.add(exitAction);
  }

  return (
    <div className={`grid grid-cols-3 gap-8 mb-8 px-8 h-10 select-none
      md:gap-0 md:px-0 mini:grid-cols-2 mini:mb-20 mini:gap-y-4
      ${enabled ? " " : " pointer-events-none"}`}>
      

      <div className="flex items-center gap-2 justify-self-start mini:row-start-2">
        <div className={controlStyle}
          onClick={() => swipe("goback")}>
          <span>❮❮</span>
          <span>Back</span>
        </div>
        <img 
          src={projectArray[index.prev].imageThumbnailSrc} 
          className="h-10 brightness-90 aspect-video object-cover rounded-sm border border-indigo-50/30">
        </img>
      </div>


      <div 
        className="group flex items-center justify-center gap-2 cursor-pointer pl-6 pr-3 rounded-xl font-bold 
          justify-self-center mini:row-start-1 mini:col-span-2 mini:w-full
          transition-colors text-indigo-50 hover:text-orange-500 active:text-orange-500
          active:bg-sky-300/30
          border-2 border-transparent hover:border-orange-800"
        onClick={closeDetails}>
        <span className="text-2xl">Close</span>
        <p className="text-5xl pb-2 my-[-6px]">×</p>
      </div>


      <div className="flex items-center gap-2 justify-self-end mini:row-start-2">
        <img 
          src={projectArray[index.next].imageThumbnailSrc} 
          className="h-10 brightness-90 aspect-video object-cover rounded-sm border border-indigo-50/30">
        </img>
        <div className={controlStyle}
          onClick={() => swipe("goforward")}>
          <span>Next</span>
          <span>❯❯</span>
        </div>
      </div>

      
    </div>
  )
}