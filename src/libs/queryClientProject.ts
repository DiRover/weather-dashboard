import type {QueryFunction} from '@tanstack/react-query';

import {QueryClient} from '@tanstack/react-query';
import axios from 'axios';

const defaultQueryFn: QueryFunction = async ({queryKey}) => {
    const url = typeof queryKey[0] == 'string' ? queryKey[0] : '';
    const params = queryKey[1];

    return await axios.get(url, {params});
};

export const queryClient = new QueryClient();

queryClient.setDefaultOptions({queries: {queryFn: defaultQueryFn}});
