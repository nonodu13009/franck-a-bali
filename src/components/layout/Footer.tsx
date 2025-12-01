import styles from './Footer.module.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>&copy; {year} VF Images. All rights reserved.</p>
        </footer>
    );
}
