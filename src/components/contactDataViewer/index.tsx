import React, { SetStateAction, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { Input } from '../input';
import { IContacts } from '../../types/common.types';
import styles from './styles.module.scss';

type Props = {
  data: IContacts[];
  isHidden: boolean;
};

const textAnimation = {
  title: {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.25,
        duration: 1,
      },
    }),
  },
  form: {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.25,
        duration: 1,
      },
    }),
  },
};

const ContactDataViewer: React.FC<Props> = ({ data, isHidden }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const formValue = {
        name,
        email,
        message,
      };

      fetch('../../api/send-request', {
        method: 'post',
        body: JSON.stringify(formValue),
      });

      setName('');
      setEmail('');
      setMessage('');
    } finally {
      //
    }
  };

  const onChangeForInput = (e: string, eTarget: SetStateAction<string>) => {
    switch (e) {
      case 'Name':
        return setName(eTarget);
        break;
      case 'Email':
        return setEmail(eTarget);
        break;
      case 'Massage':
        return setMessage(eTarget);
        break;
      default:
        return null;
        break;
    }
  };

  return (
    <motion.div
      viewport={{ once: true }}
      initial="hidden"
      whileInView={!isHidden ? 'visible' : ''}
      className={clsx(styles.wrapper, isHidden && styles.hidden)}
    >
      <div className={clsx(styles.container, 'container')}>
        <div className={styles.wrapper_inner}>
          <motion.div
            variants={textAnimation.title}
            className={styles.title}
          >
            <h2>{data[0].title}</h2>
            <p>{data[0].descr}</p>
          </motion.div>
          <motion.form
            variants={textAnimation.form}
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <ul>
              {data[0].form_names.map((item, i) => {
                const _i = i + 1;
                return (
                  <Input
                    key={_i}
                    name={item}
                    placeholder={data[0].form_examples[i]}
                    label={item}
                    type={data[0].types_input[i]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChangeForInput(item, e.target.value);
                    }}
                  />
                );
              })}
            </ul>
            <div className={styles.btn_wrapper}>
              <Button
                name={data[0].button_name}
                type="start"
                theme="light"
                disabled={false}
                isSubmit
              />
            </div>
          </motion.form>
        </div>
        <div className={styles.btn_theme}>
          <Button type="theme" theme="dark" disabled={false} />
        </div>
      </div>
    </motion.div>
  );
};

export default ContactDataViewer;
