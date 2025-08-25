import type {Dayjs} from 'dayjs';
import type {WritableAtom} from 'jotai';

import dayjs from 'dayjs';
import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';

export interface GraphParams {
    period?: [Dayjs | null, Dayjs | null] | null;
    window?: string | number | null;
    latitude: number;
    longitude: number;
    daily: string;
    timezone: string;
}

// месяц от текущей даты
const oneMonthAgo = dayjs().subtract(1, 'month');

// сегодняшняя дата
const today = dayjs();

const defaultCommonParams = {
    latitude: 55.7522,
    longitude: 37.6156,
    daily: 'temperature_2m_mean',
    timezone: 'auto',
};

const defaultParams: GraphParams = {
    ...defaultCommonParams,
    period: [oneMonthAgo, today],
    window: 3,
};

//создаю стор для хранения параметров для запросов графиков
//это Map, где ключ - это название графика, а значение - это атом с параметрами для запроса (параметры это период и кол-во дней в "окне"
//больше ни чего в параметрах не будет
const graphStore = atom<Map<string, GraphParams>>(new Map());

export const graphAtom = atomFamily<
    string,
    WritableAtom<
        GraphParams,
        [Partial<GraphParams> | null], //особенность типизации в jotai, Partial - потому что где-то есть параметр "окно"
        unknown
    >
    //получаю из стора параметры для запроса по имени графика
>(graphName =>
    atom(
        get => get(graphStore).get(graphName) ?? defaultParams,
        (get, set, params) => {
            if (params !== null) {
                //получаем предыдущий стор
                const prevStore = get(graphStore);
                const newStore = new Map(prevStore); // копия
                //записываю в него новое значение
                newStore.set(graphName, {
                    ...defaultParams,
                    ...prevStore.get(graphName),
                    ...params,
                });
                //перезаписываю стор для чистоты функции
                set(graphStore, newStore);
            }
        },
    ),
);
