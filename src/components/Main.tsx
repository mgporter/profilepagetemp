import { TargetedEvent, useEffect, useRef, useState } from "preact/compat";
import { projects } from "./PROJECTS"
import ProjectIcon from "./ProjectIcon"
import { dispatcher } from "./Dispatcher";
import ProjectDetailsPage from "./ProjectDetailsPage";

const ISMOBILEDEVICE = window.innerHeight > window.innerWidth;


export default function Main() {

  const [projectArray, setProjectArray] = useState(projects);
  const mainViewRef = useRef<HTMLDivElement>(null!);
  const iconHolderRef = useRef<HTMLDivElement>(null!);
  const [showIconHolder, setShowIconHolder] = useState(true);
  const [projectDiv, setProjectDiv] = useState<HTMLElement | null>(null);
  // const [useTransition, setUseTransition] = useState(!ISMOBILEDEVICE);
  const [useTransition] = useState(!ISMOBILEDEVICE);

  useEffect(() => {
    const unsubscribe = dispatcher.subscribe("projectTypeSelected", types => {

        setProjectDiv(null);

        const projectsCopy = [...projects];
        if (types.length === 0) {
          projectsCopy.forEach(x => x.style = "default")
          setProjectArray(projectsCopy);  // Set to default
          return;
        }
        projectsCopy.sort((a, b) => {
          let firstValid = a.types.includes(types[0]);  // Sort by first type
          let secondValid = b.types.includes(types[0]);

          if (types.length === 2) {
            firstValid = firstValid || a.types.includes(types[1]);  // If another type was given, check for it too
            secondValid = secondValid || b.types.includes(types[1]);
          }

          a.style = firstValid ? "emphasized" : "faded";   // set selected if they are part of the selection
          b.style = secondValid ? "emphasized" : "faded";
    
          if (firstValid && !secondValid) return -1;
          else if (!firstValid && secondValid) return 1;
          else return 0;
        });
        setProjectArray(projectsCopy);

      });
    
    return unsubscribe;
  }, [])

  useEffect(() => {
    const unsubscribe = dispatcher.subscribe("selectFeatured", () => {

      setProjectDiv(null);

      const projectsCopy = [...projects];
      projectsCopy.forEach(x => x.featured ? x.style = "emphasized" : x.style = "faded");
      setProjectArray(projectsCopy);
    })
    return unsubscribe;
  }, [])

  useEffect(() => {
    const unsubscribe = dispatcher.subscribe("showProjectIcons", (val) => {
      // iconHolderRef.current.style.visibility = val ? "visible" : "hidden";
      iconHolderRef.current.style.display = val ? "flex" : "none";
    })
    return unsubscribe;
  }, [])


  function handleProjectSelect(e: TargetedEvent<HTMLDivElement>) {
    if (e.target instanceof HTMLElement) {
      const target = e.target.closest(".project");
      
      if (target instanceof HTMLElement) {
        console.log(target)
        setProjectDiv(target);
        // if (!useTransition) setShowIconHolder(false);

        // target.style.zIndex = "200";

        // setShowProject({
        //   projectIndex: Number(target.dataset.id),
        //   thumbnailDiv: target,
        // });

        // setTimeout(() => {
        //   target.style.zIndex = "";
        // }, 250);

      }

    } 

  }

  // function closeDetails() {
  //   dispatcher.dispatch("showProjectIcons", true);
  //   setShowProject(null);
  // }



  return (
    <main 
      className="relative w-full pb-48 vert:mt-8 vert:pt-12 overflow-hidden"
      ref={mainViewRef}>

      {/* {showProject && 
        <ProjectDetails 
          projectArray={projectArray}
          details={showProject} 
          containerRef={mainViewRef} />} */}

      {projectDiv && 
        <ProjectDetailsPage
          projectArray={projectArray}
          projectDiv={projectDiv}
          useTransition={useTransition}
          containerRef={mainViewRef}
          setProjectDiv={setProjectDiv}
          setShowIconHolder={setShowIconHolder} />}

      {showIconHolder &&
        <div
          onClick={handleProjectSelect}
          ref={iconHolderRef}
          className="icon_holder flex w-full flex-wrap justify-center gap-6 mt-48">
            {projectArray.map((x, i) => <ProjectIcon key={x.name} project={x} id={i} />)}
        </div>
      }

    </main>
  )
}