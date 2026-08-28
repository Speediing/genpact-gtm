import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "rep",
    name: "Every sales rep",
    blurb: "The human stays in control. Their agents keep the surrounding work moving.",
    color: "#E8E8ED",
    mark: "AE",
    seat: true,
  },
  {
    id: "meeting",
    name: "Meeting partner",
    blurb: "Follows the client discussion and keeps the open deck current.",
    jobId: "live-meeting",
    color: "#FF555F",
  },
  {
    id: "response",
    name: "Buyer response agent",
    blurb: "Finds approved answers and leaves open decisions with the account team.",
    jobId: "buyer-response",
    color: "#FFAD28",
  },
  {
    id: "research",
    name: "Account research agent",
    blurb: "Watches public signals and prepares a useful first point of view.",
    jobId: "account-research",
    color: "#6D706B",
  },
];
