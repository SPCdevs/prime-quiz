import { Post } from "@/utils/types/post";
import Question from "./question";

const TriviaCardPage = async () => {
  const posts: Post[] = await (
    await fetch("http://localhost:3000/api/browse", {
      method: "GET",
    })
  ).json();

  return (
    <div className="mx-auto max-w-lg space-y-8 p-8">
      {posts.map((post, index) => (
        <Question {...post} key={index} />
      ))}
    </div>
  );
};

export default TriviaCardPage;
