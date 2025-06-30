import { colors } from "@/constants/styles";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CenterDuetProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

/**
 * Component for displaying the Center Duet information card
 */
export function CenterDuet({
  imageUrl = "https://res.cloudinary.com/di6tqrg5y/image/upload/v1751112658/dafna-1_smvsj3.png",
  title = "מרכז דואט",
  description = "מאחורי שיטת האימון שבאפליקציה עומד מרכז דואט הוותיק – מרכז הוליסטי לייעוץ, טיפול ואימון אישי לגיל השלישי. מרכז דואט שם לעצמו מטרה ללוות אנשים בגיל השלישי ובני משפחותיהם בתהליכים של שמירה על איכות חיים, בריאות רגשית ופיזית, והתמודדות עם אתגרי הזקנה.",
  buttonText = "למידע נוסף",
  onButtonPress,
}: CenterDuetProps) {
  return (
    <View className="rounded-2xl shadow-md w-full bg-white overflow-hidden">
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-[240px]"
        resizeMode="cover"
        accessibilityLabel={title}
      />
      <View className="p-5 text-center items-center gap-3" style={{ backgroundColor: colors.primaryTwo }}>
        <Text className="text-white font-bold text-2xl">{title}</Text>
        <Text className="text-white text-center text-lg">{description}</Text>
        <TouchableOpacity 
          className="rounded-lg w-[225px] bg-white border border-white items-center p-2"
          onPress={onButtonPress}
        >
          <Text style={{ color: colors.primaryDarker }} className="font-bold text-lg">{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
