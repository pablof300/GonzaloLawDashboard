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
    _id: Types.ObjectId;
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
      _id: new Types.ObjectId('16cb91bdc3464f14678934ca')
    },
    {
      type: "dummy data",
      startDate: "month ago",
      caseCompleted: true,
      steps: stepData,
      _id: new Types.ObjectId('16cb91bdc3464f14678934cb')
    }
  ];

  export = caseData;