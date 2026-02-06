import graphene
from graphene_django import DjangoObjectType
from projects.models import Project
from comments.models import Comment

class ProjectType(DjangoObjectType):
  class Meta:
    model = Project

class CommentType(DjangoObjectType):
  class Meta:
    model = Comment

class Query(graphene.ObjectType):
  projects = graphene.List(graphene.NonNull(ProjectType), required=True)
  comments = graphene.List(graphene.NonNull(CommentType), required=True)
  project = graphene.Field(ProjectType, id=graphene.ID(required=True))


  def resolve_projects(self, info, **kwargs):
    return Project.objects.all()

  def resolve_comments(self, info, **kwargs):
    return Comment.objects.all()

  def resolve_project(self, info, id):
    return Project.objects.get(pk=id)


class CreateProject(graphene.Mutation):
  class Arguments:
    title = graphene.String(required=True)
    content = graphene.String(required=True)

  project = graphene.Field(ProjectType)

  def mutate(self, info, title, content):
    project = Project.objects.create(title=title, content=content)
    return CreateProject(project=project)


class UpdateProject(graphene.Mutation):
  class Arguments:
    id = graphene.ID(required=True)
    title = graphene.String()
    content = graphene.String()

  project = graphene.Field(ProjectType)

  def mutate(self, info, id, title=None, content=None):
    project = Project.objects.get(pk=id)
    if title is not None:
      project.title = title
    if content is not None:
      project.content = content
    project.save()
    return UpdateProject(project=project)


class DeleteProject(graphene.Mutation):
  class Arguments:
    id = graphene.ID(required=True)

  ok = graphene.Boolean()
  id = graphene.ID()

  def mutate(self, info, id):
    Project.objects.filter(pk=id).delete()
    return DeleteProject(ok=True, id=id)


class Mutation(graphene.ObjectType):
  create_project = CreateProject.Field()
  update_project = UpdateProject.Field()
  delete_project = DeleteProject.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
