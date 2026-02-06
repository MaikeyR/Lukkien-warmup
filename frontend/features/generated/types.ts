export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CommentType = {
  __typename?: 'CommentType';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  project: ProjectType;
};

export type CreateProject = {
  __typename?: 'CreateProject';
  project?: Maybe<ProjectType>;
};

export type DeleteProject = {
  __typename?: 'DeleteProject';
  id?: Maybe<Scalars['ID']['output']>;
  ok?: Maybe<Scalars['Boolean']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<CreateProject>;
  deleteProject?: Maybe<DeleteProject>;
  updateProject?: Maybe<UpdateProject>;
};


export type MutationCreateProjectArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateProjectArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectType = {
  __typename?: 'ProjectType';
  comments: Array<CommentType>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<CommentType>;
  project?: Maybe<ProjectType>;
  projects: Array<ProjectType>;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateProject = {
  __typename?: 'UpdateProject';
  project?: Maybe<ProjectType>;
};
