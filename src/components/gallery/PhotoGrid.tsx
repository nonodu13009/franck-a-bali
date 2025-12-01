import Image from 'next/image';
import styles from './PhotoGrid.module.css';
import { Image as ImageType } from '@/lib/images';
import { useTranslations } from 'next-intl';

type Props = {
    images: ImageType[];
    locale: 'en' | 'fr';
};

export default function PhotoGrid({ images, locale }: Props) {
    const t = useTranslations('Shop');

    return (
        <div className={styles.grid}>
            {images.map((image) => (
                <div key={image.id} className={styles.item}>
                    <Image
                        src={image.src}
                        alt={image.alt[locale]}
                        width={image.width}
                        height={image.height}
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={styles.overlay}>
                        <button className={styles.buyButton}>{t('buy')}</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
