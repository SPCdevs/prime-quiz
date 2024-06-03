export interface Post {
  id: string;
  title: string;
  answers: {
    answer: string;
    correct: boolean;
  }[];
  user: {
    username: string;
    displayName: string;
  };
  createdAt: string;
  history: {
    answer: string;
    correct: boolean;
  }[];
  tags: {
    name: string;
  }[];
}
