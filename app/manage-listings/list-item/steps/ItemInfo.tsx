/* eslint-disable react/jsx-key */
"use client";

import { useState, useEffect } from "react";
import { Control, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType, StateProps } from "@/types";
import { getCategories, getSubCategories } from "@/services/general.api";
import { getStates, getCities } from "@/services/locations.api";
import useLoadScript from "@/hooks";
import { GOOGLE_PLACES_API_KEY } from "@/constants";

export default function ItemInfo({ control }: { control: Control<any> }) {
  const { setValue, getValues, watch } = useFormContext();
  const categoryId = watch("category_id");
  const state = watch("state");

  const { data: categories, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });
  const { data: subcategories, isPending: isSubPending } = useQuery({
    queryKey: ["sub-category", categoryId],
    queryFn: () => getSubCategories(categoryId),
  });

  const { data: states, isPending: isStatesPending } = useQuery({
    queryKey: ["location"],
    queryFn: getStates,
  });

  const stateISO = states?.filter(
    (item: StateProps) => item?.name?.toLowerCase() === state?.toLowerCase()
  )[0]?.iso2;

  const { data: cities, isPending: isCitiesPending } = useQuery({
    queryKey: ["location", stateISO],
    queryFn: () => getCities(stateISO),
  });

  const [location, setLocation] = useState("");

  useEffect(() => {
    const initialLocation = getValues("item_location");
    if (initialLocation) {
      setLocation(initialLocation);
    }
  }, [getValues]);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const scriptLoaded = useLoadScript(
    `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`
  );

  const handleChange = (address: string) => {
    setDropdownVisible(true);
    setLocation(address);
  };

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setValue("longitude", latLng.lng);
        setValue("latitude", latLng.lat);
        setValue("item_location", address);
        setLocation(address);
        setDropdownVisible(false);
      })
      .catch((error) => console.error("Error", error));
  };

  if (!scriptLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-y-[30px]">
      <div className="hidden sm:flex flex-col gap-y-[7px]">
        <h4 className="font-bold text-2xl text-slate-800">List an item</h4>
        <p className="text-slate-300">
          To start listing, fill in the product information below.
        </p>
      </div>
      <div className="flex flex-col gap-y-[25px]">
        <CustomFormField
          control={control}
          fieldtype={FormFieldType.INPUT}
          placeholder="Nikon SB"
          name="product_name"
          className="py-3 px-4 rounded-lg border border-gray-3"
          label="Product name"
        />
        <CustomFormField
          control={control}
          fieldtype={FormFieldType.SELECT}
          placeholder="Film and Photography"
          name="category_id"
          className="py-3 px-4 rounded-lg border border-gray-3"
          label="Category"
          selectItems={categories?.data}
          disabled={isPending}
        />
        <CustomFormField
          control={control}
          fieldtype={FormFieldType.SELECT}
          placeholder="DSLR Camera"
          name="sub_category_id"
          className="py-3 px-4 rounded-lg border border-gray-3"
          label="Sub-category"
          selectItems={subcategories?.data}
          disabled={isPending || isSubPending}
        />
        <div className="flex flex-col sm:flex-row sm:gap-x-6 gap-y-[30px]">
          <CustomFormField
            control={control}
            fieldtype={FormFieldType.SKELETON}
            name="state"
            className=""
            label="State"
            fullwidth
            renderSkeleton={(field) => {
              return (
                <div>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isStatesPending}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`py-3 px-4 rounded-lg border border-gray-3 h-auto outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                      >
                        <SelectValue>
                          {states?.find(
                            (item: StateProps) => item.name == field.value
                          )?.name || "Lagos"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {states?.map((item: StateProps) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />
          <CustomFormField
            control={control}
            fieldtype={FormFieldType.SKELETON}
            placeholder="Ikeja"
            name="city"
            className=""
            label="City"
            fullwidth
            renderSkeleton={(field) => {
              return (
                <div>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isStatesPending || isCitiesPending}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`py-3 px-4 rounded-lg border border-gray-3 h-auto outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                      >
                        <SelectValue>
                          {cities?.find(
                            (item: StateProps) => item.name == field.value
                          )?.name || "Ikeja"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {cities?.map((item: StateProps) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />
        </div>
        <CustomFormField
          control={control}
          fieldtype={FormFieldType.SKELETON}
          placeholder="Select location"
          name="item_location"
          className="py-3 px-4 rounded-lg border border-gray-3 outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          label="Item Location"
          renderSkeleton={(field) => (
            <PlacesAutocomplete
              value={location}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    name="item_location"
                    {...getInputProps({
                      placeholder: "Select location",
                      className:
                        "py-2 px-4 rounded-lg border border-gray-3 w-full outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                    })}
                  />
                  {dropdownVisible && (
                    <div className="autocomplete-dropdown-container flex flex-col gap-y-2 px-4 py-2 mt-2 rounded-lg bg-white">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, i) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#fafafa",
                              cursor: "pointer",
                            }
                          : {
                              backgroundColor: "#ffffff",
                              cursor: "pointer",
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                            onClick={() => handleSelect(suggestion.description)}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </PlacesAutocomplete>
          )}
        />
      </div>
    </div>
  );
}
