'use client';

import { useRouter } from 'next/navigation';
import { useCreateProjectMutation } from '@/features/projects/generated/queries.graphql';
import { ProjectForm } from '@/features/projects/components/ProjectForm';
import { gql } from '@apollo/client';

const NewProjectPage = () => {
  const router = useRouter();
  const [createProject, { loading, error }] = useCreateProjectMutation({
    update(cache, { data }) {
      const created = data?.createProject?.project;
      if (!created) return;

      cache.modify({
        fields: {
          projects(existingRefs = [], { readField }) {
            const newRef = cache.writeFragment({
              data: created,
              fragment: gql`
                fragment NewProject on ProjectType {
                  id
                  title
                }
              `,
            });

            const exists = existingRefs.some(
              (ref: { __ref: string }) => readField('id', ref) === created.id
            );
            return exists ? existingRefs : [newRef, ...existingRefs];
          },
        },
      });
    },
  });

  const handleSubmit = async ({ title, content }: { title: string; content: string }) => {
    await createProject({ variables: { title, content } });
    router.push('/projects');
  };

  return (
    <div>
      <h1>New Project</h1>
      <ProjectForm
        submitLabel="Create"
        onSubmit={handleSubmit}
        loading={loading}
        errorMessage={error?.message}
      />
    </div>
  );
};

export default NewProjectPage;
