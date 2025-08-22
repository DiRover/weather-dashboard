import type {Role} from '@/services/types.ts';

import {RoleName} from '@/services/types.ts';

export const adminAccess: Role[] = [RoleName.ADMIN];
export const commonAccess: Role[] = [RoleName.ADMIN, RoleName.USER];
