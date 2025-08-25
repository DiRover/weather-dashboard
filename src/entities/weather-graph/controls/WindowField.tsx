/**
 * Created by ROVENSKIY D.A. on 25.08.2025
 */
import type {InputNumberProps} from 'antd';

import {InputNumber} from 'antd';
import {useAtom} from 'jotai';
import {memo, useCallback} from 'react';

import {graphAtom} from '@/entities/atoms/graph.ts';

interface WindowFieldProps {
    graphName: string;
}

const WindowField = memo<WindowFieldProps>(({graphName}) => {
    const [params, setParams] = useAtom(graphAtom(graphName));

    const onChange = useCallback<
        Required<Pick<InputNumberProps, 'onChange'>>['onChange']
    >(
        value => {
            setParams({
                window: value,
            });
        },
        [setParams],
    );

    return (
        <InputNumber
            min={1}
            max={7}
            onChange={onChange}
            value={params.window}
        />
    );
});

export default WindowField;
