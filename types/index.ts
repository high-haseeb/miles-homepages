import { Control } from "react-hook-form";

export interface AuthLayoutProps {
	children: React.ReactNode;
}

export interface CustomFormFieldProps {
	control: Control<any>;
	fieldType: FormFieldType;
	label?: string;
	placeholder: string;
	name: string;
	extraInfo?: string;
	disabled?: boolean;
	dateFormat?: string;
	showTimeSelecet?: boolean;
	children?: React.ReactNode;
	className: string;
	renderSkeleton?: (field: any) => React.ReactNode;
}

export interface LoginPayload {
	email: string;
	password: string;
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
}
