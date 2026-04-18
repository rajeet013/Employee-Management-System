const ButtonTooltip = lazy(
	() => import('@/components/buttons/ButtonTooltip')
);
const CrudButton = lazy(
	() => import('@/components/buttons/CrudButton')
);
import { lazy } from 'react';

interface ActionButtonProps {
	link: string;
	id: number | string;
	slug: number | string;
	showEdit?: boolean;
	showView?: boolean;
	showDelete?: boolean;
	showBarcode?: boolean;
}

const CrudActions = ({
	link,
	id,
	slug,
	showEdit,
	showView,
	showDelete,
	showBarcode
}: ActionButtonProps) => {
	return (
		<span className='flex justify-center space-x-1'>
			{showBarcode !== false ? (
				<span className='relative flex items-center justify-center group'>
					<CrudButton {...{ type: 'barcode', link, slug }} />
					<ButtonTooltip {...{ text: 'Barcode', path: 'products' }} />
				</span>
			) : null}
			{showView !== false ? (
				<span className='relative flex items-center justify-center group'>
					<CrudButton {...{ type: 'view', link, slug }} />
					<ButtonTooltip {...{ text: 'View', path: 'products' }} />
				</span>
			) : null}

			{showEdit !== false ? (
				<span className='relative flex items-center justify-center group'>
					<CrudButton {...{ type: 'edit', link, slug: id }} />
					<ButtonTooltip {...{ text: 'Edit', path: 'products' }} />
				</span>
			) : null}

			{showDelete !== false ? (
				<span className='relative flex items-center justify-center group'>
					<CrudButton {...{ type: 'delete', link, slug:id }} />
					<ButtonTooltip {...{ text: 'Delete', path: 'products' }} />
				</span>
			) : null}
		</span>
	);
};

export default CrudActions;
