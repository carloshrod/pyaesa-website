'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu as IconMenu } from 'react-feather';
import { Menu } from '../Menu';
import { PAGES } from '@/utils/consts';
import styles from './Header.module.scss';

export const Header = () => {
	const [isHidden, setIsHidden] = useState(true);
	const pathname = usePathname();

	const handleMenu = () => {
		setIsHidden(!isHidden);
	};

	return (
		<header className={styles.Header}>
			<Menu isHidden={isHidden} setIsHidden={setIsHidden} />
			<nav className={styles.Header__navbar}>
				<Link href='/' className={styles.Header__navbar__logo}>
					<Image
						src='/sw-logo-header.png'
						width={208}
						height={388}
						alt='Sherwin Williams logo'
					/>
				</Link>
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
									className={isActive ? styles.linkActive : ''}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
				<button onClick={handleMenu}>
					<IconMenu />
				</button>
			</nav>
		</header>
	);
};
