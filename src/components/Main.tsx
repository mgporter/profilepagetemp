import { TargetedEvent, useEffect, useRef, useState } from "preact/compat";
import { projects } from "./PROJECTS"
import ProjectIcon from "./ProjectIcon"
import { dispatcher } from "./Dispatcher";
import ProjectDetails, { DetailsProp } from "./ProjectDetails";


export default function Main() {

  const [projectArray, setProjectArray] = useState(projects);
  const mainViewRef = useRef<HTMLDivElement>(null!);
  const [showProject, setShowProject] = useState<DetailsProp | null>(null);

  useEffect(() => {
    const unsubscribe = dispatcher.subscribe("projectTypeSelected", types => {
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
  }, []);

  useEffect(() => {
    const unsubscribe = dispatcher.subscribe("selectFeatured", () => {
      const projectsCopy = [...projects];
      projectsCopy.forEach(x => x.featured ? x.style = "emphasized" : x.style = "faded");
      setProjectArray(projectsCopy);
    })
    return unsubscribe;
  }, [])


  function handleProjectSelect(e: TargetedEvent<HTMLDivElement>) {
    if (e.target instanceof HTMLElement) {
      const target = e.target.closest(".project");
      
      if (target instanceof HTMLElement) {

        target.style.zIndex = "200";

        const thumbnailRect = target.getBoundingClientRect();

        setShowProject({
          project: projects[Number(target.dataset.id)],
          thumbnailRect: thumbnailRect,
        });

        setTimeout(() => {
          target.style.zIndex = "";
        }, 250);

      }

    } 

  }


  return (
    <main 
      className="relative py-48 overflow-hidden"
      ref={mainViewRef}>

      <div
        onClick={handleProjectSelect} 
        className="icon_holder flex w-full flex-wrap justify-center gap-6">

        {showProject && 
          <ProjectDetails details={showProject} containerRef={mainViewRef} setShowProject={setShowProject} />}

        {projectArray.map(x => <ProjectIcon key={x.name} project={x} />)}

      </div>
    </main>
  )
}