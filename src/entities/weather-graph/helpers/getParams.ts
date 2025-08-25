import type {Dayjs} from 'dayjs';

import dayjs from 'dayjs';

import type {GraphRequestParams} from '@/entities/weather-graph/helpers/types.ts';

import {DATE_FORMAT} from './constants';

// месяц от текущей даты
const oneMonthAgo = dayjs().subtract(1, 'month').format(DATE_FORMAT);

// сегодняшняя дата
const today = dayjs().format(DATE_FORMAT);

const defaultTempParams: GraphRequestParams = {
    latitude: 55.7522,
    longitude: 37.6156,
    start_date: oneMonthAgo,
    end_date: today,
    daily: 'temperature_2m_mean',
    timezone: 'auto',
};

export const getParams = (
    start?: Dayjs | null,
    end?: Dayjs | null,
): GraphRequestParams => {
    if (!start || !end) return defaultTempParams;
    const {start_date, end_date, ...restParams} = defaultTempParams;
    return {
        ...restParams,
        start_date: dayjs(start).format(DATE_FORMAT),
        end_date: dayjs(end).format(DATE_FORMAT),
    };
};
