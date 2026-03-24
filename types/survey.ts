export interface SurveyOption {
  label: string;
  value: string;
  inline_response?: string;
  description?: string;
  sublabel?: string;
}

export interface SurveyQuestionData {
  id: number;
  question: string;
  sub_question: string | null;
  type: "radio" | "checkbox" | "input" | "custom";
  options: SurveyOption[] | null;
  section: string;
  field_id: string;
  is_optional: boolean;
  auto_next: boolean;
  is_active: boolean;
  input_type: string | null;
  placeholder: string | null;
  created_at: string;
  updated_at: string;
  max_length: number | null;
  min_length: number | null;
  set_id?: number;
}

export interface SurveyStage {
  set_id: number;
  category_id: number;
  order_id: number;
  total_questions: number;
  questions: SurveyQuestionData[];
}

export interface SurveyAPIResponse {
  message: string;
  data: {
    variation_id: number;
    total_stages: number;
    stages: SurveyStage[];
  };
}
