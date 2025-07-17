import { colors } from '@/constants/styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface VideoUploaderProps {
    onPress?: () => void;
    label: string;
}

/**
 * Reusable video upload component for forms
 */
export const MainFileUploader: React.FC<VideoUploaderProps> = ({
    onPress,
}) => {
    return (
        <TouchableOpacity
            className="mb-4 h-[146px] border rounded-lg items-center justify-center"
            style={{ borderColor: colors.primaryDarker }}
        >
            <TouchableOpacity
                className="w-[60px] h-[60px] rounded-lg flex-row items-center justify-center "
                style={{ borderColor: colors.primaryDarker, backgroundColor: colors.primaryDarker }}
                onPress={onPress}
            >
                <Ionicons name="add" size={35} color={'white'} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};
