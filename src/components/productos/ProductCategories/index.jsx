import Image from 'next/image';
import styles from './ProductCategories.module.scss';
import { DYNAMIC_IDS } from '@/components/consts';
import Link from 'next/link';

export const ProductCategories = ({
	categories,
	currentCategory: { name: categoryName, description },
	currentPath = '',
}) => {
	return (
		<section className={styles.Container}>
			<h2>
				Descubre <span>productos por categorías</span>
			</h2>
			{categoryName ? (
				<h3>
					<span>{categoryName}</span>
				</h3>
			) : null}
			{description ? (
				<p className={styles.categoryDescription}>{description}</p>
			) : null}
			<div className={styles.Grid}>
				{categories?.length > 0
					? categories.map(category => {
							const { id, name, handle, image } = category;
							const dynamicId = DYNAMIC_IDS[handle] || '';
							const path = `/productos/${currentPath}/${handle}`;

							return (
								<Link
									key={`cat-${id}`}
									href={path}
									className={styles.Grid__item}
									id={styles[dynamicId]}
								>
									<p>{name}</p>
									<Image
										src={image}
										alt={name}
										width={990}
										height={560}
										priority
									/>
								</Link>
							);
						})
					: null}
			</div>
		</section>
	);
};
