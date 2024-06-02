"use client";
import React, { FormEvent, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Trash, Plus, Send } from "lucide-react";

const CreateForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<null | string>(null);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (correctAnswer === options[index]) {
      setCorrectAnswer(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const triviaData = {
      title: question,
      options: options.map((option) => {
        return { correct: option == correctAnswer, answer: option };
      }),
    };
    fetch("/api/create", {
      method: "post",
      body: JSON.stringify(triviaData),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        isRequired
        fullWidth
        label="Question"
        variant="underlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className="my-8  space-y-4 rounded-lg bg-default-50 p-8">
        <h2 className="text-sm font-bold">Answers</h2>
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <Input
              fullWidth
              variant="underlined"
              placeholder={`Answer ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="mr-2"
            />
            <Checkbox
              isSelected={correctAnswer === option}
              isDisabled={option == ""}
              onChange={() => {
                setCorrectAnswer(option);
              }}
            >
              Correct
            </Checkbox>
            <Button
              isIconOnly
              type="button"
              color="danger"
              variant="flat"
              onClick={() => handleRemoveOption(index)}
              className="ml-2"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          color="primary"
          variant="flat"
          onClick={() => {
            setOptions([...options, ""]);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Answer
        </Button>
      </div>
      <Button type="submit" color="primary" variant="flat" className="w-full">
        <Send className="mr-2 h-4 w-4" /> Post Trivia
      </Button>
    </form>
  );
};

export default CreateForm;
