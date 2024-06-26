import { Mail, MapPin, Phone } from 'react-feather';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PAGES } from '@/utils/consts';
import styles from './Menu.module.scss';

export const Menu = ({ isHidden, setIsHidden }) => {
	const pathname = usePathname();

	return (
		<div className={`${styles.Menu} ${isHidden ? '' : styles.visible}`}>
			<section className={styles.Menu__containerList}>
				<ul>
					{PAGES.map((item, i) => {
						const isActive =
							pathname === '/'
								? pathname === item.pathname
								: pathname.includes(item.handle);

						return (
							<li key={`${item.label}-${i}`}>
								<Link
									href={item.pathname}
									as={item.pathname}
									onClick={() => setIsHidden(true)}
									className={isActive ? styles.linkActive : ''}
								>
									<span>{item.label}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</section>
			<div className={styles.Menu__divider}></div>
			<section className={styles.Menu__footer}>
				<div>
					<Phone size={18} />
					<span>(844) 420-9500</span>
				</div>
				<div>
					<Mail size={18} />
					<span>contacto@pyaesa.com.mx</span>
				</div>
				<div>
					<MapPin size={18} />
					<span>
						Abasolo # 972 (Entre Corona y P. Agüero) Saltillo, Coahuila 25900,
						México
					</span>
				</div>
			</section>
		</div>
	);
};
