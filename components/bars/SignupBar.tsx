import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

type Step = 1 | 2 | 3;

type SignupBarProps = {
  currentStep: Step;
  showBack?: boolean;
  onBack?: () => void;
};

export default function SignupBar({
  currentStep,
  showBack = false,
  onBack,
}: SignupBarProps) {
  return (
    <View className="px-6 pt-2 pb-3">
      <TouchableOpacity
        onPress={onBack}
        disabled={!showBack}
        className="w-8 h-8 items-center justify-center -ml-1 mt-3 mb-3"
      >
        {showBack && (
          <Ionicons name="chevron-back" size={28} color={colors.black} />
        )}
      </TouchableOpacity>

      <View className="mt-2 flex-row items-center">
        <StepCircle step={1} active={currentStep >= 1} />
        <StepLine active={currentStep >= 2} />
        <StepCircle step={2} active={currentStep >= 2} />
        <StepLine active={currentStep >= 3} />
        <StepCircle step={3} active={currentStep >= 3} />
      </View>
    </View>
  );
}

function StepCircle({
  step,
  active,
}: {
  step: number;
  active: boolean;
}) {
  return (
    <View
      className="w-7 h-7 rounded-full items-center justify-center"
      style={{
        backgroundColor: active ? colors.orange : colors.gray,
      }}
    >
      <Text style={{ color: colors.white, fontSize: 12, fontWeight: "700" }}>
        {step}
      </Text>
    </View>
  );
}

function StepLine({ active }: { active: boolean }) {
  return (
    <View className="flex-1 mx-2">
      <View
        className="h-[3px] rounded-full"
        style={{
          backgroundColor: active ? colors.orange : colors.gray,
        }}
      />
    </View>
  );
}