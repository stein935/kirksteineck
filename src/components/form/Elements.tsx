import { useEffect, useState } from "react";

class Elements {
  Input = (props: {
    item: { type: string; text: string };
    index: number;
    onChange: (index: number, item: { type: string; text: string }) => void;
  }) => {
    const [item, setItem] = useState(props.item);
    useEffect(() => {
      setItem(item);
    }, [item]);

    const onChange = (event: { target: { value: string } }) => {
      const newValue = event.target.value;
      setItem((prevState) => {
        const newItem = { ...prevState, text: newValue };
        props.onChange(props.index, newItem);
        return newItem;
      });
    };
    return (
      <>
        <label className="block">
          <span className="font-bold text-stone-700">{item.type}</span>
          <input
            type="text"
            className="mt-0 block w-full border-0 border-b-2 border-stone-200 px-0.5 font-serif italic focus:border-indigo-500 focus:ring-0"
            defaultValue={item.text}
            onChange={onChange}
          />
        </label>
      </>
    );
  };
  Textarea = (props: {
    item: { type: string; text: string };
    index: number;
    onChange: (index: number, item: { type: string; text: string }) => void;
  }) => {
    const [item, setItem] = useState(props.item);

    useEffect(() => {
      setItem(item);
    }, [item]);

    const onChange = (event: { target: { value: string } }) => {
      const newValue = event.target.value;
      setItem((prevState) => {
        const newItem = { ...prevState, text: newValue };
        props.onChange(props.index, newItem);
        return newItem;
      });
    };
    return (
      <>
        <label className="block">
          <span className="font-bold text-stone-700">{item.type}</span>
          <textarea
            className="mt-0 block w-full border-0 border-b-2 border-stone-200 px-0.5 font-serif italic focus:border-indigo-500 focus:ring-0"
            rows={4}
            defaultValue={item.text}
            onChange={onChange}
          ></textarea>
        </label>
      </>
    );
  };
  Select = (props: {
    item: { type: string; options: string[] };
    onChange: (event: { target: { value: string } }) => void;
  }) => {
    const [item, setItem] = useState(props.item);

    useEffect(() => {
      setItem(item);
    }, [item]);

    const onChange = (event: { target: { value: string } }): void => {
      props.onChange(event);
    };
    return (
      <>
        <label className="block">
          <span className="font-bold text-stone-700">{item.type}</span>
          <select
            className="mt-0 block w-full border-0 border-b-2 border-stone-200 px-0.5 font-serif italic focus:border-indigo-500 focus:ring-0"
            onChange={onChange}
          >
            {item.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </>
    );
  };
}

const elements = new Elements();
export default elements;
