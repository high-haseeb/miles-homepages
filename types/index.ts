import { Control } from "react-hook-form";
import { DateRange } from "react-day-picker";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldType;
  label?: string;
  placeholder?: string;
  name: string;
  extraInfo?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelecet?: boolean;
  children?: React.ReactNode;
  className: string;
  renderSkeleton?: (field: any) => React.ReactNode;
  selectItems?: SelectItemsProps[];
  date?: DateRange;
}

interface SelectItemsProps {
  category_id: string;
  category_name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  bio: string;
}

export enum FormFieldType {
  INPUT = "input",
  EMAIL = "email",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  FILE = "file",
  NUMBER = "number",
}

export interface StatsCardProps {
  src: string;
  title: string;
  stat: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

export interface StepProps {
  [key: number]: React.ReactNode;
}

export interface StepperProps {
  steps: StepProps[];
  currentStep: number;
  complete: boolean;
}

interface Schedule {
  single_date?: {
    start_date: string;
    end_date: string;
  };
  multiple_date_ranges?: string[];
  recurring_days_of_week?: string[];
  recurring_start_date?: string;
  recurring_end_date?: string;
  schedule_type: string;
}

export interface ListItemPayload {
  product_name: string;
  category_id: string;
  sub_category_id: string;
  item_location: string;
  description: string;
  quantity_available: number;
  estimated_value: number;
  price_per_day: number;
  image?: File[];
  latitude?: number;
  longitude?: number;
  multiple_date_ranges?: string;
  recurring_days_of_week?: string[];
  recurring_end_date?: Date;
}

export interface ItemProps {
  id: number;
  name: string;
  price: number;
  location: string;
  lat: number;
  lng: number;
  itemId: string;
  img?: string;
}

export interface InitialValuesProps {
  product_name: string;
  item_location: string;
  description: string;
  image: File;
  category_id: string;
  quantity_available: number;
  estimated_value: number;
  price_per_day: number;
  multiple_date_ranges: DateRange;
  recurring_days_of_week: string[];
  recurring_end_date: Date;
}
