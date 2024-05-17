import { ChangeEvent } from "react";

interface Props {
  name: string;
  label: string;
  value: string | number;
  options?: string[];
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}
class Elements {
  Input = ({ name, label, value, onChange }: Props) => {
    return (
      <label className="block">
        <span className="font-bold text-stone-700">{label}</span>
        <input
          type="text"
          name={name}
          className="mt-0 block w-full border-0 border-b-2 border-stone-200 px-0.5 font-serif italic focus:border-indigo-500 focus:ring-0"
          defaultValue={value}
          onChange={onChange}
        />
      </label>
    );
  };
  Textarea = ({ name, label, value, onChange }: Props) => {
    return (
      <label className="block">
        <span className="font-bold text-stone-700">{label}</span>
        <textarea
          name={name}
          className="mt-0 block w-full border-0 border-b-2 border-stone-200 px-0.5 font-serif italic focus:border-indigo-500 focus:ring-0"
          rows={4}
          defaultValue={value}
          onChange={onChange}
        ></textarea>
      </label>
    );
  };
  Select = ({ name, label, value, options, onChange }: Props) => {
    return (
      <label className="block">
        <span className="font-bold text-stone-700">{label}</span>
        <select
          name={name}
          className="mt-0 block w-full border-0 border-b-2 border-stone-200 px-0.5 font-serif italic focus:border-indigo-500 focus:ring-0"
          onChange={onChange}
          defaultValue={value}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  };
}
const elements = new Elements();
export default elements;
