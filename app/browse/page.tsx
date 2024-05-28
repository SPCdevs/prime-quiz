"use client";

import React, { useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Button } from '@nextui-org/button';

const TriviaCardPage = () => {
  // Placeholder data
  const question = "What is the capital of France?";
  const answers = ["Paris", "Berlin", "London", "Madrid"];
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswerSelection = (answer:string) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardBody>
            <h3 className="pb-5">{question}</h3>
            {answers.map((answer, index) => (
          <Button
            variant="flat"
            key={index}
            onClick={() => handleAnswerSelection(answer)}
            className="mb-2"
          >
            {answer}
          </Button>
        ))}
        </CardBody>
        
        
      </Card>
    </div>
  );
};

export default TriviaCardPage;
