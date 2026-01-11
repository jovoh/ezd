
export interface FAQItem {
  question: string;
  answer: string;
}

export interface CourseData {
  title: string;
  description: string;
  points: string[];
  cta: string;
}

export interface FormData {
  name: string;
  mobile: string;
  course: 'TDC' | 'PDC' | '';
  schedule: string;
  message: string;
}
