import dayjs from 'dayjs';

import type {GraphParams} from '@/entities/atoms/graph';

import {DATE_FORMAT} from './constants';

export const getParams = (params: GraphParams) => {
    const start = dayjs(params.period?.[0]).format(DATE_FORMAT);
    const end = dayjs(params.period?.[1]).format(DATE_FORMAT);
    const {period, ...restParams} = params;
    return {
        ...restParams,
        start_date: dayjs(start).format(DATE_FORMAT),
        end_date: dayjs(end).format(DATE_FORMAT),
    };
};
