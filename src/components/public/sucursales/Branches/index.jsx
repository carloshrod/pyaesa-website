'use client';
import { useState } from 'react';
import { Mail, Map, MapPin, Phone } from 'react-feather';
import { ToggleView } from '../ToggleView';
import { BranchesMap } from '../BranchesMap';
import styles from './Branches.module.scss';
import { NoData } from '@/components';

export const Branches = ({ branches }) => {
	const [isGrid, setIsGrid] = useState(true);

	return (
		<>
			<ToggleView isGrid={isGrid} setIsGrid={setIsGrid} />
			{isGrid ? (
				branches?.length > 0 ? (
					<div className={styles.BranchesGrid}>
						{branches.map(branch => (
							<div key={branch?.id} className={styles.BranchesGrid__item}>
								<div className={styles.BranchesGrid__item__title}>
									<h3>{branch?.title}</h3>
								</div>
								<div className={styles.BranchesGrid__item__info}>
									<div className={styles.location}>
										<MapPin size={18} />
										<span>
											{branch?.address?.full}, {branch?.address?.notes}
										</span>
									</div>
									<div className={styles.phone}>
										<Phone size={18} />
										{branch?.phones?.join(' | ')}
									</div>
									<div className={styles.email}>
										<Mail size={18} />
										{branch?.email}
									</div>
									<div className={styles.city}>
										<Map size={18} />
										{branch?.city}
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<NoData item='sucursales' />
				)
			) : (
				<BranchesMap branches={branches} />
			)}
		</>
	);
};
