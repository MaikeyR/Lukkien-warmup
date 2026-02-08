import json

import pytest
from django.test import Client

from projects.models import Project


@pytest.fixture
def gql_client():
  return Client()


def gql_post(client, query, variables=None):
  payload = {"query": query, "variables": variables or {}}
  response = client.post("/graphql/", data=json.dumps(payload), content_type="application/json")
  return response


@pytest.mark.django_db
def test_projects_query_returns_list_and_items(gql_client):
  Project.objects.create(title="P1", content="C1")
  Project.objects.create(title="P2", content="C2")

  query = """
    query Projects {
      projects {
        id
        title
      }
    }
  """

  response = gql_post(gql_client, query)
  assert response.status_code == 200
  data = response.json()["data"]["projects"]
  assert isinstance(data, list)
  assert len(data) == 2
  assert all(item is not None for item in data)


@pytest.mark.django_db
def test_project_query_by_id(gql_client):
  project = Project.objects.create(title="P1", content="C1")

  query = """
    query Project($id: ID!) {
      project(id: $id) {
        id
        title
        content
      }
    }
  """

  response = gql_post(gql_client, query, variables={"id": str(project.id)})
  assert response.status_code == 200
  data = response.json()["data"]["project"]
  assert data["id"] == str(project.id)
  assert data["title"] == "P1"
  assert data["content"] == "C1"


@pytest.mark.django_db
def test_create_project_mutation(gql_client):
  mutation = """
    mutation CreateProject($title: String!, $content: String!) {
      createProject(title: $title, content: $content) {
        project {
          id
          title
          content
        }
      }
    }
  """

  response = gql_post(
    gql_client,
    mutation,
    variables={"title": "New", "content": "Body"},
  )
  assert response.status_code == 200
  data = response.json()["data"]["createProject"]["project"]
  assert data["title"] == "New"
  assert data["content"] == "Body"
  assert Project.objects.filter(id=data["id"]).exists()


@pytest.mark.django_db
def test_update_project_mutation(gql_client):
  project = Project.objects.create(title="Old", content="Body")

  mutation = """
    mutation UpdateProject($id: ID!, $title: String, $content: String) {
      updateProject(id: $id, title: $title, content: $content) {
        project {
          id
          title
          content
        }
      }
    }
  """

  response = gql_post(
    gql_client,
    mutation,
    variables={"id": str(project.id), "title": "New"},
  )
  assert response.status_code == 200
  data = response.json()["data"]["updateProject"]["project"]
  assert data["title"] == "New"
  project.refresh_from_db()
  assert project.title == "New"


@pytest.mark.django_db
def test_delete_project_mutation(gql_client):
  project = Project.objects.create(title="P1", content="C1")

  mutation = """
    mutation DeleteProject($id: ID!) {
      deleteProject(id: $id) {
        ok
        id
      }
    }
  """

  response = gql_post(gql_client, mutation, variables={"id": str(project.id)})
  assert response.status_code == 200
  data = response.json()["data"]["deleteProject"]
  assert data["ok"] is True
  assert data["id"] == str(project.id)
  assert not Project.objects.filter(id=project.id).exists()
