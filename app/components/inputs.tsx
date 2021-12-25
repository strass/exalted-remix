import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";

export const TextInput = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => <input ref={ref} {...props} />);
