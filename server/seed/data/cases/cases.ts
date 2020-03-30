import { Schema, Types } from 'mongoose';

interface Steps {
  step: string;
  date: string;
  completed: boolean;
  stepDescription: string;
  stepNumber: string;
}

interface Case {
  type: string;
  startDate: string;
  caseCompleted: boolean;
  steps: Array<Steps>;
}

const stepData: Steps[] = [
  {
    step: "paperwork",
    date: "today",
    completed: true,
    stepDescription: "boring",
    stepNumber: "1",
  },
  {
    step: "execution",
    date: "tomorrow",
    completed: false,
    stepDescription: "exciting",
    stepNumber: "2",
}
]

const caseData: Case[] = [
  {
    type: "dummy",
    startDate: "yesterday",
    caseCompleted: false,
    steps: stepData,

  }
];

export = caseData;
