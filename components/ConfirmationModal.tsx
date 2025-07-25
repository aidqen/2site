import { useEffect, useRef } from "react";
import { Animated, Modal, Text, TouchableOpacity, View } from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  visible,
  title,
  message,
  confirmText = "מחק",
  cancelText = "בטל",
  confirmColor = "#ef4444", // red-500
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const modalAnimation = useRef(new Animated.Value(0)).current;

  // Animate modal when it appears/disappears
  useEffect(() => {
    Animated.timing(modalAnimation, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, modalAnimation]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <Animated.View
          className="bg-white rounded-xl p-6 w-4/5 max-w-md"
          style={{
            transform: [
              {
                scale: modalAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
            opacity: modalAnimation,
          }}
        >
          <Text className="text-xl font-bold mb-2 text-center">{title}</Text>
          <Text className="text-base mb-6 text-center">{message}</Text>

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="flex-1 py-3 px-4 rounded-lg mr-2 bg-gray-200"
              onPress={onCancel}
              disabled={isLoading}
            >
              <Text className="text-center font-semibold text-gray-700">
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3 px-4 rounded-lg ml-2"
              style={{ backgroundColor: confirmColor }}
              onPress={onConfirm}
              disabled={isLoading}
            >
              <Text className="text-center font-semibold text-white">
                {isLoading ? "טוען..." : confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
