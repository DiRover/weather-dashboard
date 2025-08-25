import {atomWithStorage} from 'jotai/utils';

//атом для хранения состояния тёмного режима в localStorage

export const atomDarkMode = atomWithStorage('dark', true);
