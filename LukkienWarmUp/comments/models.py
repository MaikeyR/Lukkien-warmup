from django.db import models
from projects.models import Project


class Comment(models.Model):
  project = models.ForeignKey(Project, related_name='comments', on_delete=models.CASCADE)
  content = models.TextField()
