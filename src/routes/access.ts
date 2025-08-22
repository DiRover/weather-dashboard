import type {Role} from '@/helpers/types.ts';

import {RoleName} from '@/helpers/types.ts';

export const adminAccess: Role[] = [RoleName.ADMIN];
export const commonAccess: Role[] = [RoleName.ADMIN, RoleName.USER];
