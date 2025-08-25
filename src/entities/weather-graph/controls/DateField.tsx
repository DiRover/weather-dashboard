/**
 * Created by ROVENSKIY D.A. on 24.08.2025
 */
import type {RangePickerProps} from 'antd/es/date-picker';
import type {ReactNode} from 'react';

import {DatePicker} from 'antd';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import {memo, useCallback, useMemo} from 'react';

import {graphAtom} from '@/entities/atoms/graph.ts';

//Компонент для ввода периода для  данных, которые будут отображены

interface DateFieldProps {
    graphName: string;
    extra?: ReactNode;
}

const {RangePicker} = DatePicker;

const DateField = memo<DateFieldProps>(({graphName, extra}) => {
    const [params, setParams] = useAtom(graphAtom(graphName));
    const onChange = useCallback(
        (
            value: Parameters<Required<RangePickerProps>['onChange']>[0] | null,
        ) => {
            setParams({
                period: value ? [value[0], value[1]] : null,
            });
        },
        [setParams],
    );

    const maxDate = useMemo(() => dayjs(), []); //ограничение периода, максимальная дата - текущее число

    return (
        <div className="flex gap-x-4">
            <RangePicker
                onChange={onChange}
                className="w-[300px]"
                maxDate={maxDate}
                value={params.period}
            />

            {extra}
        </div>
    );
});

export default DateField;
