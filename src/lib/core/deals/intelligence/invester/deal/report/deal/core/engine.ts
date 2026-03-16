// src/lib/core/deals/engine.ts

export type DealInput = {
  address: string;
  arv: number;
  askingPrice: number;
  estimatedRepairs: number;
  source: string;
};

export type Deal = {
  id: string;
  address: string;
  arv: number;
  askingPrice: number;
  estimatedRepairs: number;
  createdAt: Date;
};

export type DealReport = {
  id: string;
  dealId: string;
  spread: number;
  roi: number;
  score: number;
  exitStrategy: "wholesale" | "flip" | "rental";
};

export type AssignmentResult = {
  dealId: string;
  assignmentFee: number;
  revenueEventId: string;
  journalId: string;
};
