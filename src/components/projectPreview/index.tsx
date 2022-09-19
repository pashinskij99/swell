import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { Button } from '../button';
import { ROUTES } from '../../constants/pages.constants';

type Props = {
    title: string,
    imagePreview: string,
    slug: string
}

const ProjectPreview : React.FC<Props> = (props: Props) => {
    const { title, imagePreview, slug } = props

    const onClick = () => {

    }

    return (
        <div className={styles.wrapper}>
            <div className={clsx(styles.container, 'container')}>
                <span className={clsx(styles.span, 'text-2')}>Next project</span>
                <h2>{ title }</h2>
                <Button type="start" theme="light" href={ROUTES.PROJECT.replace(':slug', slug)} disabled={false} name="View project" />
                <div className={styles.wrapper_img}>
                    <img src={imagePreview} alt="img-next-project" />
                </div>
            </div>
        </div>
    )
}

export default ProjectPreview;
