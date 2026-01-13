import React from "react";
import { ScrollView, View, Text } from "react-native";
import MyProfileSection from "@/components/sections/MyProfileSection";
import MyStyleSection from "@/components/sections/MyStyleSection";
import LoadingOverlay from "@/components/loadings/LoadingOverlay";

import { getMyMemberInfo } from "@/apis/memberApi";
import type { Member } from "@/types/member";

export default function MyScreen(){
    const [member, setMember] = React.useState<Member | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const me = await getMyMemberInfo();
        console.log("[MyScreen] getMyMemberInfo response:", me);
        
        if (!mounted) return;
        setMember(me);
      } catch (e) {
        if (!mounted) return;
        setError("회원 정보를 불러오지 못했어요.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (error || !member) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>{error ?? "회원 정보가 없습니다."}</Text>
      </View>
    );
  }

    return (
        <>
            <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
                <MyProfileSection member={member} />
                <MyStyleSection member={member} />
            </ScrollView>
            <LoadingOverlay visible={loading} />
        </>
    );
}