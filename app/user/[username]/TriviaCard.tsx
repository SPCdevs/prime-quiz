import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Post } from "@/utils/types/post";

const TriviaCard = ({ question, key }: { question: Post; key: number }) => {
  return (
    <Card className="max-w-[400px] p-4" key={key}>
      <h4>{question.title}</h4>
      {question.answers.map((ans) => (
        <Button key={ans.answer} variant="flat" className="my-2">
          {ans.answer}
        </Button>
      ))}
    </Card>
  );
};

export default TriviaCard;
