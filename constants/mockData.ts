import { Category, Section } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: '1',
    title: 'אירובי - סיבולת לב וריאה',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751112658/dafna-1_smvsj3.png',
    sectionId: 'short',
    description: 'אירובי - סיבולת לב וריאה'
  },
  {
    id: '2',
    title: 'פונקציונלי תפקודי',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751112658/dafna-1_smvsj3.png',
    sectionId: 'long',
    description:`שיפור באורך מלא הכולל את כל מרכיבי הכושר המומלצים לגיל השלישי. נעשה בו שימוש קבוע בכיסא, ושילוב אביזרים כמו: כדור, גומיות, משקולות ומשקל גוף.`
  },
  {
    id: '3',
    title: 'גמישות',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png',
    sectionId: 'short',
    description: 'אירובי - סיבולת לב וריאה'
  },
  {
    id: '4',
    title: 'שיווי משקל התמצאות במרחב',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113469/6_1_brwutz.png',
    sectionId: 'short',
    description: 'אירובי - סיבולת לב וריאה'
  },
  {
    id: '5',
    title: 'כוח',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751112658/categories/strength_no5ofb.png',
    sectionId: 'short',
    description: 'אירובי - סיבולת לב וריאה'
  },
  {
    id: '6',
    title: 'יוגה עם כיסא',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113469/6_1_brwutz.png',
    sectionId: 'long',
    description: 'אירובי - סיבולת לב וריאה'
  },
  {
    id: '7',
    title: 'פילאטיס עם כיסא',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png',
    sectionId: 'long',
    description: 'אירובי - סיבולת לב וריאה'
  }
];

export const SECTIONS: Section[] = [
  {
    id: "recommendation",
    title: 'המלצות ארגון הבריאות העולמי לגילאי 60+',
    description: 'המלצות ארגון הבריאות העולמי לפעילות גופנית לגילאי 60 ומעלה'
  },
  {
    id: "long",
    title: 'שיעורים באורך מלא',
    description: 'שיעורים באורך מלא במגוון סגנונות'
  },
  {
    id: "short",
    title: 'שיעורים קצרים',
    description: 'שיעורים קצרים במגוון סגנונות'
  }
];
