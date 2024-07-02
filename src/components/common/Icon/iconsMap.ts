import plusIcon from 'assets/icons/plusIcon.svg?raw';
import crossIcon from 'assets/icons/crossIcon.svg?raw';
import trashIcon from 'assets/icons/trashIcon.svg?raw';
import bookmarkIcon from 'assets/icons/bookmarkIcon.svg?raw';

import { type IconName } from 'types.ts';

export const iconsMap: Record<IconName, string> = {
	plus: plusIcon,
	cross: crossIcon,
	trash: trashIcon,
	bookmark: bookmarkIcon
}