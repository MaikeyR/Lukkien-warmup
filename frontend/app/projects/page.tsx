'use client';

import { ProjectList } from '@/features/projects/components/ProjectList';
import { useProjectsQuery } from '@/features/projects/generated/queries.graphql';

const ProjectsPage = () => {
  const { loading, error, data } = useProjectsQuery();
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const projects = (data?.projects ?? []);

  return (
    <div>
      <h1>Projects</h1>
      <ProjectList projects={projects} />
    </div>
  );
};

export default ProjectsPage;
