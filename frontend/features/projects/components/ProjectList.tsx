import { ProjectType } from '@/features/generated/types';

export function ProjectList({ projects }: { projects: ProjectType[] }) {
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