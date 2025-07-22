import { colors } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

interface PlusButtonProps {
  onPress?: () => void;
}

export const PlusButton: React.FC<PlusButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="mb-4 h-[68px] w-full border rounded-2xl items-center justify-center"
      style={{ borderColor: colors.primaryDarker }}
      onPress={onPress ? onPress : () => {}}
    >
      <TouchableOpacity
        className="w-[41px] h-[41px] rounded-lg flex-row items-center justify-center"
        style={{ borderColor: colors.primaryDarker, backgroundColor: colors.primaryDarker }}
      >
        <Ionicons name="add" size={35} color={'white'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
