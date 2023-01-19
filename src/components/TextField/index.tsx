import type { InputHTMLAttributes, ReactNode } from 'react';

export interface TextFieldProps {
  children: ReactNode;
  label?: string;
}

TextField.Icon = TextFieldIcon;
TextField.Input = TextFieldInput;

function TextField({ children, label }: TextFieldProps) {
  return (
    <label>
      {label ? (
        <div className="mb-1 text-xs font-bold text-gray1">{label}</div>
      ) : (
        <></>
      )}
      <div className="flex h-10 w-full items-center gap-3 rounded border border-gray2 bg-white py-2.5 px-5 ring-black focus-within:ring-1">
        {children}
      </div>
    </label>
  );
}

TextField.displayName = 'TextInput.Root';

export interface TextFieldIconProps {
  children: ReactNode;
}

function TextFieldIcon(props: TextFieldIconProps) {
  return <i className="text-gray-400 m-0 p-0">{props.children}</i>;
}

TextFieldIcon.displayName = 'TextInput.Icon';

export type TextFieldInputProps = InputHTMLAttributes<HTMLInputElement>;

function TextFieldInput(props: TextFieldInputProps) {
  return (
    <input
      className="bg-transparent text-gray-100 flex-1 text-xs outline-none placeholder:text-gray1"
      {...props}
    />
  );
}

TextFieldInput.displayName = 'TextInput.Input';

export default TextField;
