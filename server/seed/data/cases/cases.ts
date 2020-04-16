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
      step: "Letter of Engagement",
      date: "3/23/2020",
      completed: true,
      stepDescription: "Sent Letter of Engagement to your email! Feel free to sign it and send it back on email, or upload it to you files. -Lawyer",
      stepNumber: "1",
    },
    {
      step: "Appointment",
      date: "4/1/2020",
      completed: false,
      stepDescription: "An in person appointment where we talk about...",
      stepNumber: "2",
  }
  ]

  const stepData2: Steps[] = [
    {
      step: "Letter of Engagement",
      date: "3/23/2020",
      completed: true,
      stepDescription: "Sent Letter of Engagement to your email! Feel free to sign it and send it back on email, or upload it to you files. -Lawyer",
      stepNumber: "1",
    },
    {
      step: "Appointment",
      date: "4/1/2020",
      completed: true,
      stepDescription: "An in person appointment where we talk about your case",
      stepNumber: "2",
  },
  {
    step: "Debriefing",
    date: "4/10/2020",
    completed: false,
    stepDescription: "We will go over the latest updates in the case and how we plan to ...",
    stepNumber: "3",
}
  ]

  const caseData: Case[] = [
    {
      type: "Intellectual Property",
      startDate: "1/12/2019",
      caseCompleted: false,
      steps: stepData,
      _id: new Types.ObjectId('16cb91bdc3464f14678934ca')
    },
    {
      type: "Contract Analysis",
      startDate: "3/23/2020",
      caseCompleted: false,
      steps: stepData2,
      _id: new Types.ObjectId('16cb91bdc3464f14678934cb')
    },
    {
      type: "Copyright",
      startDate: "3/28/2020",
      caseCompleted: false,
      steps: stepData2,
      _id: new Types.ObjectId('16cb91bdc3464f14678934df')
    }
  ];

  export = caseData;