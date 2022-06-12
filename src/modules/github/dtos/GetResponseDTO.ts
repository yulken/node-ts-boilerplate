
export interface IGetResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  type: string;
  site_admin: boolean;
  name?: string | undefined;
  company?: string | undefined;
  blog?: string | undefined;
  location?: string | undefined;
  email?: string | undefined;
  hireable?: string | undefined;
  bio?: string | undefined;
  twitter_username?: string | undefined;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at?: string | undefined;
}

export default class GithubResponseDTO{
  login: string;
  id: number;
  nodeId: string;
  avatarUrl: string;
  gravatarId: string;
  type: string;
  siteAdmin: boolean;
  name?: string | undefined;
  company?: string | undefined;
  blog?: string | undefined;
  location?: string | undefined;
  email?: string | undefined;
  hireable?: string | undefined;
  bio?: string | undefined;
  twitterUsername?: string | undefined;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt?: string | undefined;

  constructor(params: IGetResponse){
    this.login = params.login;
    this.id = params.id;
    this.nodeId = params.node_id;
    this.avatarUrl = params.avatar_url;
    this.gravatarId = params.gravatar_id;
    this.type = params.type;
    this.siteAdmin = params.site_admin;
    this.name = params.name;
    this.company = params.company;
    this.blog = params.blog;
    this.location = params.location;
    this.email = params.email;
    this.hireable = params.hireable;
    this.bio = params.bio;
    this.twitterUsername = params.twitter_username;
    this.publicRepos = params.public_repos;
    this.publicGists = params.public_gists;
    this.followers = params.followers;
    this.following = params.following;
    this.createdAt = params.created_at;
    this.updatedAt = params.updated_at;
  }
}