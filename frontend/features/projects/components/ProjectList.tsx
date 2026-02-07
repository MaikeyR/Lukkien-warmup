import type { ProjectsQuery } from '@/features/projects/generated/queries.graphql';
import Link from 'next/link';

type Project = ProjectsQuery['projects'][number];

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}
              className="block p-4 border rounded hover:bg-gray-600"
            >
              <h3>{project.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}