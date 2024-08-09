import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import { CustomFormFieldProps, FormFieldType } from "@/types";
import { Textarea } from "../ui/textarea";

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  const { fieldType, placeholder, className, selectItems, renderSkeleton } =
    props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div>
          <FormControl>
            <Input
              type="text"
              placeholder={placeholder}
              {...field}
              className={`${className} h-auto outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.NUMBER:
      return (
        <div>
          <FormControl>
            <Input
              type="number"
              placeholder={placeholder}
              {...field}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              className={`${className} h-auto outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div>
          <FormControl>
            <Input
              type="password"
              placeholder={placeholder}
              {...field}
              className={`${className} h-auto outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <div>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                className={`${className} h-auto outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
              >
                <SelectValue>
                  {props.name === "category_id"
                    ? selectItems?.find(
                        (item) => item.category_id == field.value
                      )?.category_name
                    : selectItems?.find((item) => item.id == field.value)
                        ?.name || placeholder}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {selectItems?.map((item) => (
                  <SelectItem
                    key={
                      props.name === "category_id" ? item.category_id : item.id!
                    }
                    value={
                      props.name === "category_id" ? item.category_id : item.id!
                    }
                  >
                    {props.name === "category_id"
                      ? item.category_name
                      : item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    case FormFieldType.FILE:
      return (
        <div>
          <FormControl>
            <Input
              type="file"
              multiple
              accept="image/*"
              {...field}
              className={`${className} h-auto outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
              onChange={(e) => {
                const files = e.target.files;
                const fileArray = Array.from(files!);
                field.onChange(fileArray);
              }}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.TEXTAREA:
      return (
        <div>
          <FormControl>
            <Textarea
              type="text"
              placeholder={placeholder}
              {...field}
              className={`${className} outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant={"outline"} className={`h-auto ${className}`}>
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, "LLL dd, y")} -{" "}
                        {format(field.value.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(field.value.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                defaultMonth={field.value?.from}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    default:
      return null;
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
          {label && (
            <FormLabel className="text-black font-medium mb-2">
              {label}
            </FormLabel>
          )}
          <RenderField props={props} field={field} />
          {extraInfo && <FormDescription>{extraInfo}</FormDescription>}
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}
