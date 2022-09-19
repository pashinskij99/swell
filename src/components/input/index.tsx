/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';

type Props = {
  theme?: 'light' | 'dark';
  disabled?: boolean;
  name: string;
  label: string;
  type: string;
  loading?: boolean;
  validated?: boolean;
  error?: string | undefined;
  placeholder: string;
  typing?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<Props> = (props: Props) => {
  const {
    name,
    error,
    placeholder,
    validated,
    loading,
    type,
    label,
    typing,
    onChange,
  } = props;

  return (
    <div className={styles.input_wrapper}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={styles.input_title}>{label}</label>
      <span
        data-validate={validated}
        data-typing={typing}
        data-loading={loading}
        className={styles.clear_btn}
      >
      </span>
      <input
        className={styles.input}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
      <span className={styles.input_error}>{error}</span>
    </div>
  );
};

export { Input };
