import { Control } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { ChangeEvent, FormEvent } from "react";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  handleSearchSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  handleSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
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
  name?: string;
  id?: string;
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
  category_id: number;
  sub_category_id: number;
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
  schedule_type?: string;
}

export interface ItemProps {
  category_id: number;
  category_name: string;
  description: string;
  end_date: string | null;
  estimated_value: string;
  full_name: string;
  item_images: Array<ItemImagesProps>;
  item_location: string;
  latitude: string;
  listing_created_at: string;
  listing_id: number;
  longitude: string;
  multiple_date_ranges: string;
  price_per_day: string;
  product_name: string;
  quantity_available: string;
  recurring_days_of_week: string | null;
  recurring_end_date: string | null;
  recurring_start_date: string | null;
  single_date: string | null;
  start_date: string | null;
  status: string;
  sub_category_id: number;
  sub_category_name: string;
}

export interface ItemImagesProps {
  image_id: number;
  image_url: string;
  public_id: string;
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

export interface SMSOTPPayload {
  phone_number: string;
  // Channel: "sms";
}

export interface VerifySMSOTPPayload {
  phone_number: string;
  otp: string;
}

export interface GetListingsParamsProps {
  category?: number;
  location?: string;
  date?: Date;
}

export interface SearchListingsKeywordProps {
  searchKeyword: string;
}

export interface ListingsByDateRangeParamsProps {
  startDate: Date;
  endDate: Date;
}

export interface UpdateListingPayload {
  product_name?: string;
  category_id?: number;
  sub_category_id?: number;
  item_location?: string;
  description?: string;
  quantity_available?: number;
  estimated_value?: number;
  price_per_day?: number;
  latitude?: number;
  longitude?: number;
}

export interface PaymentDetailsProps {
  "product-renter": {
    product: string;
    renter: string;
  };
  id: string;
  "date-time": {
    date: string;
    time: string;
  };
  price: string;
  receipt: string;
  arrId: string;
}

export interface CreateBookingPayload {
  listing_id: number;
  price: string;
  service_charge: string;
  vat: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface PageLimitParams {
  page: number;
  limit: number;
  rental_status?: string;
  lister_status?: string;
}
