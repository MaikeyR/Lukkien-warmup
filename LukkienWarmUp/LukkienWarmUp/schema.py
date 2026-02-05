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
  projects = graphene.List(ProjectType)
  comments = graphene.List(CommentType)

  def resolve_projects(self, info, **kwargs):
    return Project.objects.all()

  def resolve_comments(self, info, **kwargs):
    return Comment.objects.all()

schema = graphene.Schema(query=Query)
