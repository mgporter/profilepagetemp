import { Project } from "./PROJECTS"

interface ProjectIconProps {
  project: Project;
}

const MAX_TYPES = 5;

export default function ProjectIcon({ project }: ProjectIconProps) {

  return (
    <div data-id={project.id} 
      className={`project group relative aspect-[2.2] w-64 overflow-clip 
        cursor-pointer select-none border-2 transition-all
        ${project.style === "faded" ? " opacity-60" : " "}
        ${project.style === "emphasized" ? " border-violet-100 scale-105" : " border-transparent"} `}>

      <p className="absolute top-1 left-1 z-20 bg-black/40 px-[2px] rounded-sm font-medium
        opacity-0 group-hover:opacity-100 text-base">{project.name} {project.featured && "★"}</p>

      <div className="absolute bottom-1 left-1 z-20 text-xs flex gap-2 text-rose-100">
        {project.types.slice(0, MAX_TYPES).map(type => (
          <p key={type} className="bg-black/40 px-[2px] py-[1px] rounded-sm">{type}</p>
        ))}
      </div>

      <img 
        className="relative z-10 w-full aspect-auto contrast-[90%] brightness-90 
        group-hover:contrast-100 group-hover:brightness-100" 
        src={project.imageThumbnailSrc} 
      />
      
    </div>
  )

}