import { FC } from 'react';

import styles from './Title.module.css';

interface TitleProps {
    text: string;
}

const Title: FC<TitleProps> = ({ text }) => (
    <h1 className={styles.title}>{text}</h1>
);

export default Title;
