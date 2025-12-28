import type { PartyMember } from "@/types/party";

export type ReviewPartyMember = Omit<PartyMember, "role"> & {
  isFeedbackGiven: boolean;
};

export interface ReviewMemberItem {
  partyId: number;
  partyMember: ReviewPartyMember[];
}