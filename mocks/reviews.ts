import type { ReviewMemberItem } from "@/types/review";

export const reviews: ReviewMemberItem[] = [
  {
    partyId: 1,
    partyMember: [
	  {	
	    "memberId": 1,
	    "nickname": "민주",
	    "profileImage": 2,
	    "role": "HOST",
	  },
	  {
	    "memberId": 2,
	    "nickname": "채채",
	    "profileImage": 3,
	    "role": "PARTICIPANT"
	  },
	  {
	    "memberId": 3,
	    "nickname": "주주",
	    "profileImage": 4,
	    "role": "PARTICIPANT"
	  },
    ]
  }
];
