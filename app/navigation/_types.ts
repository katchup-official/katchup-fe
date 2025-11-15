import { MainStackParamList } from "./MainStack";

export type RootStackParamList = {
  GreetingScreen: undefined;
  MainTabs: undefined;
};

export type RootTabParamList = {
  CreatePartyScreen: undefined;
  PartyListScreen: undefined;
  MainStack: {
    screen: keyof MainStackParamList;
    params?: MainStackParamList[keyof MainStackParamList];
  };
  EventListScreen: undefined;
  MyScreen: undefined;
};