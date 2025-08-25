import type {Dayjs} from 'dayjs';
import type {WritableAtom} from 'jotai';

import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';

export interface GraphParams {
    period?: [Dayjs | null, Dayjs | null] | null;
    window?: string | number | null;
}

//создаю стор для хранения параметров для запросов графиков
//это Map, где ключ - это название графика, а значение - это атом с параметрами для запроса (параметры это период и кол-во дней в "окне"
//больше ни чего в параметрах не будет
const graphStore = atom<Map<string, GraphParams>>(new Map());

export const graphAtom = atomFamily<
    string,
    WritableAtom<
        GraphParams | undefined,
        [GraphParams | null], //особенность типизации в jotai, Partial - потому что где-то есть параметр "окно"
        unknown
    >
    //получаю из стора параметры для запроса по имени графика
>(graphName =>
    atom(
        get => get(graphStore).get(graphName),
        (get, set, params) => {
            if (params !== null) {
                //получаем предыдущий стор
                const prevStore = get(graphStore);
                const newStore = new Map(prevStore); // копия
                //записываю в него новое значение
                newStore.set(graphName, {
                    ...prevStore.get(graphName),
                    ...params,
                });
                //перезаписываю стор для чистоты функции
                set(graphStore, newStore);
            }
        },
    ),
);
