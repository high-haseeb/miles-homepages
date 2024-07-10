import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CustomFormFieldProps, FormFieldType } from "@/types";

const RenderField = ({
	field,
	props,
}: {
	field: any;
	props: CustomFormFieldProps;
}) => {
	const { fieldType, placeholder, className } = props;
	switch (fieldType) {
		case FormFieldType.INPUT:
			return (
				<div>
					<FormControl>
						<Input
							type={fieldType}
							placeholder={placeholder}
							{...field}
							className={className}
						/>
					</FormControl>
				</div>
			);
		case FormFieldType.PASSWORD:
			return (
				<div>
					<FormControl>
						<Input
							type={fieldType}
							placeholder={placeholder}
							{...field}
							className={className}
						/>
					</FormControl>
				</div>
			);
		default:
			break;
	}
};

export default function CustomFormField(props: CustomFormFieldProps) {
	const { control, label, name, extraInfo } = props;
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<RenderField props={props} field={field} />
					{extraInfo && <FormDescription>{extraInfo}</FormDescription>}
					<FormMessage className="shad-error" />
				</FormItem>
			)}
		/>
	);
}
