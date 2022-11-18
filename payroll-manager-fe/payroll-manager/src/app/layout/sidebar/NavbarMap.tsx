import React from 'react';
import NavItem from './NavItem';

interface Props {
	items: Array<any>;
}

export default function NavbarMap({ items }: Props) {
	return (
		<>
			{items.map((item, i) => (
				<>
					<NavItem
						key={i}
						icon={item.icon}
						href={item.href}
						title={item.title}
					/>
				</>
			))}
		</>
	);
}
