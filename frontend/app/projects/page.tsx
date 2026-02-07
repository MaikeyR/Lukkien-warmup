'use client';

import { ProjectList } from '@/features/projects/components/ProjectList';
import { useProjectsQuery } from '@/features/projects/generated/queries.graphql';
import Link from 'next/link';

const ProjectsPage = () => {
  const { loading, error, data } = useProjectsQuery();
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const projects = (data?.projects ?? []);

  return (
    <div>
      <div>
        <h1>Projects</h1>
        <ProjectList projects={projects} />
      </div>
      <hr className="my-4 h-px bg-gray-600" />
      <div>
        <Link href={`/projects/new`}
              className="block p-4 border rounded hover:bg-gray-600"
        >
          <h3>New project</h3>
        </Link>
      </div>
    </div>
  );
};

export default ProjectsPage;
