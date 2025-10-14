import { View, Text, TouchableOpacity } from "react-native";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/colors"

type Question = {
  id: number;
  question: string;
  options: string[];
};

type StyleQuestionListProps = {
  questions: Question[];
  answers: { [key: number]: number | null };
  onSelect: (questionId: number, optionIdx: number) => void;
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
            const selected = answers[q.id] === idx;
            return (
              <TouchableOpacity
                key={idx}
                className="w-full rounded-md py-4 px-4 mb-3"
                style={{
                  backgroundColor: selected ? colors.lightOrange : colors.white,
                  borderColor: selected ? colors.lightOrange : colors.gray,
                  borderWidth: 1,
                }}
                onPress={() => onSelect(q.id, idx)}
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