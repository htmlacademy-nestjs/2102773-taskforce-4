export enum ApplicationServiceURL {
  Auth = 'http://localhost:3333/api/auth',
  User = 'http://localhost:3333/api/user',
  Task = 'http://localhost:3000/api/tasks',
  Comment = 'http://localhost:3000/api/comments',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
