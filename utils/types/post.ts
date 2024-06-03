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
    correctAnswer: string | null;
    answer: string;
    correct: boolean;
  }[];
  tags: {
    name: string;
  }[];
}
