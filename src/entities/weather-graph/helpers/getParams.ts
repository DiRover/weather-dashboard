import dayjs from 'dayjs';

import type {GraphParams} from '@/entities/atoms/graph';

import {DATE_FORMAT} from './constants';

//метод для обработки параметров для их отправки в запрос

export const getParams = (params: GraphParams) => {
    //даты приходят в виде Dayjs
    const start = dayjs(params.period?.[0]).format(DATE_FORMAT);
    const end = dayjs(params.period?.[1]).format(DATE_FORMAT);
    const {period, window, ...restParams} = params;
    return {
        ...restParams,
        start_date: dayjs(start).format(DATE_FORMAT),
        end_date: dayjs(end).format(DATE_FORMAT),
    };
};
