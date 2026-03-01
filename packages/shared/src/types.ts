export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface NowPage {
  userId: string;
  username: string;
  content: string;
  updatedAt: string;
}
