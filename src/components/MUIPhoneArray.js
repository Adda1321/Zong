import React from "react";
import { useForm , useFieldArray } from "react-hook-form";

const Price = ({ control, index }) => {
  const value = useWatch({
    control,
    name: `items[${index}]`,
    defaultValue: {}
  });
  return <span>{(value.type || 0) * (value.amount || 0)}</span>;
};

const PriceTotal = ({ control }) => {
  const value = useWatch({
    control,
    name: `items`,
    defaultValue: {}
  });

  console.log(value);
  return null;
};

export default function PhoneArray() {
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      {fields.map(({ id, name, type, amount }, index) => {
        return (
          <div key={id}>
            <input
              {...register(`test.${index}.value`)} 
              name={`items[${index}].name`}
              defaultValue={name}
            />
            
           

            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        );
      })}

      <input type="submit" />
      <button type="button" onClick={() => append({})}>
        Append
      </button>
    
    </form>
  );
}
