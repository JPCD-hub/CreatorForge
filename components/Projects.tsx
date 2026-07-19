import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return <section className="section projects" id="proyectos"><div className="container"><SectionHeading eyebrow="PORTAFOLIO  /  03 PROYECTOS" title="Proyectos seleccionados" text="Construimos identidades y productos digitales con una razón clara para existir." /><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div></div></section>;
}
