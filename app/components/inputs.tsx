import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, Ref } from "react";

export const TextInput = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => <input ref={ref} {...props} />);

const Input = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => {
  switch (props.type) {
    case "textarea":
      return <textarea {...props} ref={ref} />;
    case "text":
    case "string":
    case "number":
      return (
        <TextInput
          ref={ref}
          {...props}
          type={props.type === "string" ? "text" : props.type}
        />
      );
    default:
      if (process.env.NODE_ENV === "production") {
        return <TextInput ref={ref} {...props} />;
      }
      throw new Error(`No Input type for ${props.type}`);
  }
});

export default Input;
