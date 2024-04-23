import { MutableRef, useEffect, useState } from "preact/hooks";
import { Project } from "./PROJECTS";
import { dispatcher } from "./Dispatcher";

interface ProjectDetailsControlsProps {
  index: {cur: number, prev: number, next: number};
  projectArray: Project[];
  enableControls: boolean;
  pageContentRef: MutableRef<HTMLDivElement>;
  closeDetails: () => void;
}

const controlDivStyle = "group flex justify-center items-center gap-2 mini:justify-self-stretch \
  mini:row-start-2 p-2 cursor-pointer rounded-xl text-indigo-50/90 text-2xl transition-colors \
  border-2 border-indigo-50/30 \
  hover:border-yellow-200/60 hover:text-yellow-300 \
  active:bg-sky-300/30 "

const controlLabelStyle = "flex items-center gap-2 px-2 font-bold";

export default function ProjectDetailsControls({
  index,
  projectArray,
  enableControls,
  pageContentRef, 
  closeDetails}: ProjectDetailsControlsProps) {

  const [enabled, setEnabled] = useState(enableControls);

  useEffect(() => {
    const unsubscribe = dispatcher.subscribe("enableProjectControls", (val) => {
      setEnabled(val);
    });
    return unsubscribe;
  }, [])

  function swipe(action: "goforward" | "goback") {
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
        }
        pageContentRef.current.classList.add(enterAction);

        dispatcher.dispatch("projectSelected", {idx: newIndex, div: null});
      }
    };

    pageContentRef.current.classList.add(exitAction);
  }

  return (
    <div className={`grid grid-cols-3 gap-8 mb-16 px-8 select-none
      md:gap-0 md:px-0 
      mini:mb-12 mini:gap-y-4 mini:auto-rows-min mini:grid-cols-2 mini:gap-x-4
      ${enabled ? " " : " pointer-events-none"}`}>
      

      <div className={controlDivStyle + " mini:flex-col justify-self-start"}
        onClick={() => swipe("goback")}>
        <div className={controlLabelStyle}>
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
          transition-colors text-indigo-50 border-2 border-indigo-50/30
          hover:text-orange-500 hover:border-orange-800
          active:bg-sky-300/30 active:text-orange-500"
        onClick={closeDetails}>
        <span className="text-2xl">Close</span>
        <p className="text-5xl pb-2 my-[-6px]">×</p>
      </div>


      <div className={controlDivStyle + " mini:flex-col-reverse justify-self-end"}
        onClick={() => swipe("goforward")}>
        <img 
          src={projectArray[index.next].imageThumbnailSrc} 
          className="h-10 brightness-90 aspect-video object-cover rounded-sm border border-indigo-50/30">
        </img>
        <div className={controlLabelStyle}>
          <span>Next</span>
          <span>❯❯</span>
        </div>
      </div>

      
    </div>
  )
}