import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { navigation } from '../../constants/pages.constants';

type Props = {
  // theme: 'light' | 'dark'
  // disabled: boolean
  // id: number
  page?: '/about' | '/contact';
};

const Footer: React.FC<Props> = (props: Props) => {
  const { page } = props;

  const { pathname } = useRouter();

  return (
    <div data-page={pathname} className={styles.root}>
      <div
        data-disabled={false}
        className={clsx(styles.container, 'container')}
      >
        <div className={styles.wrapper_footer}>
          <div className={styles.footer_logo}>
            <Link href="/">
              <div className={styles.logo}></div>
            </Link>
          </div>
          <nav className={styles.footer_nav}>
            <ul className={styles.footer_list_1}>
              {navigation.map(({ id, title, path }, i) => (
                <li key={id}>
                  <Link href={path}>
                    <a>{title}</a>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className={styles.footer_list_2}>
              <li>
                <a href="#">swell2022@gmail.com</a>
              </li>
              <li>
                <a href="#">(757) 289-7174</a>
              </li>
              <li>
                <a href="#">
                  3908 Atlantic Ave, Virginia
                  <br />
                  Beach, VA 23451
                </a>
              </li>
            </ul>
            <ul className={styles.footer_social_list}>
              <li>
                <Link href="#">
                  <a className={styles.social_list_item_facebook}> </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className={styles.social_list_item_linkedin}> </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className={styles.social_list_item_instagram}> </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export { Footer };
