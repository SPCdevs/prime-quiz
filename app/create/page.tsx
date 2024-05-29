"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Textarea } from "@nextui-org/input";
import { Trash, Plus, Send } from "lucide-react";

const CreateTrivia = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<null | string>(null);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (correctAnswer === options[index]) {
      setCorrectAnswer(null);
    }
  };

  const handleCorrectAnswerChange = (option: string) => {
    setCorrectAnswer(option);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const triviaData = {
      question,
      options,
      answer: correctAnswer,
    };
    console.log(triviaData); // Replace with actual post request
  };

  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="mb-6 text-center text-3xl">Create a Trivia Question</h1>
      <form onSubmit={handleSubmit}>
        <Textarea
          isRequired
          fullWidth
          variant="underlined"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-6"
        />
        {options.map((option, index) => (
          <div key={index} className="mb-4 flex items-center">
            <Input
              fullWidth
              isClearable
              variant="underlined"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="mr-2"
            />
            <Checkbox
              isSelected={correctAnswer === option}
              onChange={() => handleCorrectAnswerChange(option)}
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
          onClick={handleAddOption}
          className="mb-6"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Answer
        </Button>
        <Button type="submit" color="primary" variant="flat" className="w-full">
          <Send className="mr-2 h-4 w-4" /> Post Trivia
        </Button>
      </form>
    </div>
  );
};

export default CreateTrivia;
