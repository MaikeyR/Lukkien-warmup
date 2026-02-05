import type { ProjectsQuery } from '@/features/projects/generated/queries.graphql';

type Project = ProjectsQuery['projects'][number];

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}