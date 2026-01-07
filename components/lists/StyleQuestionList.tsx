import { View, Text, TouchableOpacity } from "react-native";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/colors"

import type { UIQuestion } from "@/types/styles";

type StyleQuestionListProps = {
  questions: UIQuestion[];
  answers: Record<number, number>; 
  onSelect: (questionId: number, answerId: number) => void;
};

export default function StyleQuestionList({
  questions,
  answers,
  onSelect,
}: StyleQuestionListProps) {
  return (
    <View className="px-6 ml-5 mr-5">
      {questions.map((q) => (
        <View key={q.id} className="mb-8">
          <Text style={[fonts.mediumText, { marginBottom: 12 }]}>
            {q.id}. {q.question}
          </Text>

          {q.options.map((opt, idx) => {
            const answerId = q.answerIds[idx];
            const selected = answers[q.id] === answerId;
            return (
              <TouchableOpacity
                key={idx}
                className="w-full rounded-md py-4 px-4 mb-3"
                style={{
                  backgroundColor: selected ? colors.lightOrange : colors.white,
                  borderColor: selected ? colors.lightOrange : colors.gray,
                  borderWidth: 1,
                }}
                onPress={() => onSelect(q.id, answerId)}
              >
                <Text
                  style={[
                    fonts.mediumText,
                    { fontSize: 15, 
                      color: selected ? colors.white : colors.black,
                    },
                  ]}
                >
                  {idx === 0 ? "A. " : "B. "}
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}