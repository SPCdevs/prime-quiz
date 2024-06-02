export interface Post {
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
}
