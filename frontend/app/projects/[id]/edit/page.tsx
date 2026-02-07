'use client';

import { useRouter, useParams } from 'next/navigation';
import { useProjectQuery, useUpdateProjectMutation } from '@/features/projects/generated/queries.graphql';
import type { ProjectQuery } from '@/features/projects/generated/queries.graphql';
import { ProjectForm } from '@/features/projects/components/ProjectForm';

type Project = NonNullable<ProjectQuery['project']>;

const ProjectEditForm = ({ project }: { project: Project }) => {
  const router = useRouter();
  const [updateProject, { loading, error }] = useUpdateProjectMutation({
    refetchQueries: ['Projects'],
  });

  const handleSubmit = async ({ title, content }: { title: string; content: string }) => {
    await updateProject({ variables: { id: project.id, title, content } });
    router.push('/projects');
  };

  return (
    <ProjectForm
      initialTitle={project.title}
      initialContent={project.content}
      submitLabel="Update"
      onSubmit={handleSubmit}
      loading={loading}
      errorMessage={error?.message}
    />
  );
};

const EditProjectPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, loading, error } = useProjectQuery({
    variables: { id: id ?? '' },
    skip: !id,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const project = data?.project;

  return (
    <div>
      <h1>Edit Project</h1>
      {project ? <ProjectEditForm key={project.id} project={project} /> : <p>Project not found</p>}
    </div>
  );
};

export default EditProjectPage;
