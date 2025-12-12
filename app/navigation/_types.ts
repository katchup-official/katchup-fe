import type { NavigatorScreenParams } from "@react-navigation/native";
import { MainStackParamList } from "./MainStack";
import { CreatePartyStackParamList } from "./CreatePartyStack";

export type RootStackParamList = {
  GreetingScreen: undefined;
  MainTabs: undefined;
};

export type RootTabParamList = {
  CreatePartyStack: NavigatorScreenParams<CreatePartyStackParamList>;
  PartyListScreen: undefined;
  MainStack: {
    screen: keyof MainStackParamList;
    params?: MainStackParamList[keyof MainStackParamList];
  };
  LikedPartyListScreen: undefined;
  MyScreen: undefined;
};