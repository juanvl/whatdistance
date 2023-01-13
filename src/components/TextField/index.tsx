import type { InputHTMLAttributes, ReactNode } from 'react';

export interface TextInputRootProps {
  children: ReactNode;
}

TextField.Icon = TextFieldIcon;
TextField.Input = TextFieldInput;

function TextField(props: TextInputRootProps) {
  return (
    <div className="flex h-12 w-full items-center gap-3 rounded border border-gray2 bg-white py-2.5 px-5 ring-black focus-within:ring-1">
      {props.children}
    </div>
  );
}

TextField.displayName = 'TextInput.Root';

export interface TextInputIconProps {
  children: ReactNode;
}

function TextFieldIcon(props: TextInputIconProps) {
  return <i className="text-gray-400 h-6 w-6">{props.children}</i>;
}

TextFieldIcon.displayName = 'TextInput.Icon';

export type TextInputInputProps = InputHTMLAttributes<HTMLInputElement>;

function TextFieldInput(props: TextInputInputProps) {
  return (
    <input
      className="bg-transparent text-gray-100 placeholder:text-textSecondary flex-1 text-xs outline-none"
      {...props}
    />
  );
}

TextFieldInput.displayName = 'TextInput.Input';

export default TextField;
