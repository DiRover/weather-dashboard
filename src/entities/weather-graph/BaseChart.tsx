/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import {BarChart, LineChart} from 'echarts/charts';
import {
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    GridComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import {LabelLayout} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {memo, useEffect, useRef} from 'react';

interface BaseChartProps {
    options: Parameters<ReturnType<typeof echarts.init>['setOption']>[0];
}

echarts.use([
    BarChart,
    LineChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    CanvasRenderer,
    LabelLayout,
]);

//общий компонент для всех типов графиков

const BaseChart = memo<BaseChartProps>(({options}) => {
    const container = useRef<HTMLDivElement | null>(null);
    const chart = useRef<ReturnType<typeof echarts.init>>(null);

    useEffect(() => {
        //создаём график, если он не был создан
        if (container.current && !chart.current) {
            chart.current = echarts.init(container.current);
        }

        //удаляем график при размонтировании
        return () => {
            if (chart.current) {
                chart.current.dispose();
                chart.current = null;
                container.current = null;
            }
        };
    }, []);

    useEffect(() => {
        //даю графика данные для отображения, если он есть
        if (chart.current) {
            chart.current.setOption(options);
        }
    }, [options]);

    //контейнер для графика
    return <div ref={container} className="h-96 w-full" />;
});

export default BaseChart;
