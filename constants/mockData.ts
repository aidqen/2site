import { Category, Section } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'אירובי - סיבולת לב וריאה',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751112658/dafna-1_smvsj3.png',
    sectionId: 'short',
    description: 'אירובי - סיבולת לב וריאה'
  },
  {
    id: '2',
    name: 'פונקציונלי תפקודי',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751112658/dafna-1_smvsj3.png',
    sectionId: 'long',
    description:`שיפור באורך מלא הכולל את כל מרכיבי הכושר המומלצים לגיל השלישי. נעשה בו שימוש קבוע בכיסא, ושילוב אביזרים כמו: כדור, גומיות, משקולות ומשקל גוף.`
  },
  {
    id: '3',
    name: 'גמישות',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png',
    sectionId: 'short',
    description: 'אירובי - סיבולת לב וריאה'
  },
  {
    id: '4',
    name: 'שיווי משקל התמצאות במרחב',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113469/6_1_brwutz.png',
    sectionId: 'short',
    description: 'אירובי - סיבולת לב וריאה'
  },
  {
    id: '5',
    name: 'כוח',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751112658/categories/strength_no5ofb.png',
    sectionId: 'short',
    description: 'אירובי - סיבולת לב וריאה'
  },
  {
    id: '6',
    name: 'יוגה עם כיסא',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113469/6_1_brwutz.png',
    sectionId: 'long',
    description: 'אירובי - סיבולת לב וריאה'
  },
  {
    id: '7',
    name: 'פילאטיס עם כיסא',
    imgUrl: 'https://res.cloudinary.com/di6tqrg5y/image/upload/v1751113343/4_1_no5ofb.png',
    sectionId: 'long',
    description: 'אירובי - סיבולת לב וריאה'
  }
];

export const sections: Section[] = [{
  id: 'recommendation',
  imgUrl: '10 2.png',
  title: 'המלצות ארגון הבריאות העולמי לגילאי 60+',
  link: '/recommendations',
},
{
  id: 'long',
  imgUrl: '1 5.png',
  title: 'שיעורים באורך מלא',
  link: '/section/[id]',
  description: 'כאן תמצאו שיעורים באורך מלא בכמה סגנונות שונים',

},
{
  id: 'short',
  imgUrl: '1 7.png',
  title: 'שיעורים קצרים',
  link: '/section/[id]',
  description: 'כאן תמצאו שיעורים קצרים בכמה סגנונות שונים',
}
]