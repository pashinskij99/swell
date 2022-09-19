import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';

type Props = {
  type: (
    'view'
    | 'theme'
    | 'contact'
    | 'start'
    | 'mobile'
    | 'character'
    | 'prev_slider'
    | 'next_slider'
    | 'soc_link'
  )
  theme: 'light' | 'dark'
  disabled?: boolean
  id?: number
  name?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  href?: string
  isSubmit?: boolean
};

const Button: React.FC<Props> = (props:Props) => {
  const {
    disabled, type, theme, name, id, onClick, href, isSubmit,
  } = props

  const nameBtn = () => {
    switch (type) {
      case 'view':
        return 'View'
      case 'theme':
        return theme === 'dark' ? 'Dark' : 'Light'
      case 'start':
        return 'Start'
      case 'mobile':
        return 'Click to start'
      case 'character':
        return 'Characters'
      case 'contact':
        return 'Contact'
      default:
        return '';
    }
  }
  if (href) {
    return (
      <Link
        href={href}
      >
        <a
          data-theme={theme}
          className={styles.button}
          data-disabled={disabled}
          data-type={type}
        >
          {
            name || nameBtn()
          }
          <span className={styles.btn_image}></span>
        </a>
      </Link>
    )
  }
  return (
    <button
      data-theme={theme}
      data-type={type}
      disabled={disabled}
      className={styles.button}
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
    >
      <div className={styles.btn_text}>
        {
          name || nameBtn()
        }
      </div>
      <span className={styles.btn_id}>{id}</span>
      <span className={styles.btn_image}></span>
    </button>
  );
};

export {
  Button,
}
