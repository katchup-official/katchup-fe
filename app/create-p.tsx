  import React, { useState } from "react";
  import { ScrollView } from "react-native";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import type { RouteProp } from "@react-navigation/native";
  import PartyHeader from "@/components/bars/PartyHeader";
  import type { CreatePartyStackParamList } from "@/app/navigation/CreatePartyStack";
  import CreateParty from "@/components/inputs/CreateParty";
  import CommonToast from "@/components/toasts/CommonToast";

  type CreatePartyScreenRouteProp = RouteProp<
    CreatePartyStackParamList,
    "CreatePartyScreen"
  >;

  export default function CreatePartyScreen(){
    const navigation = useNavigation();
    const { params } = useRoute<CreatePartyScreenRouteProp>();
    const { eventId, eventName, facilityName, startDate, endDate } = params;
    const [showToast, setShowToast] = useState(false);

    const handleCreatePartySuccess = () => {
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        
        navigation.reset({
          index: 0,
          routes: [{ name: "ChooseEventScreen" as never }],
        });
      }, 1500);
  };

    return (
      <>
        <ScrollView 
          className="flex-1 bg-white"
          keyboardShouldPersistTaps="handled" 
        >
          <PartyHeader
            eventName={eventName}
            facilityName={facilityName}
            startDate={startDate}
            endDate={endDate}
            showListTitle={false}
          />
          <CreateParty
            eventId={eventId}
            facilityName={facilityName}
            startDate={startDate}
            endDate={endDate}
            onCreateSuccess={handleCreatePartySuccess}
          />
        </ScrollView>

        <CommonToast
          visible={showToast}
          message="파티가 생성되었습니다!"
          subMessage="[파티 목록] - [MY] 탭에서 확인하기"
        />
      </>
    );
  }