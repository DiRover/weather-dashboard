/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import {Button, Form, Input} from 'antd';
import {memo, useCallback} from 'react';

import type {UserFormValues} from '@/services/types.ts';

import {createUser} from '@/services/users.ts';

const {Item} = Form;

const UserForm = memo(() => {
    const handleCreateUser = useCallback((values: UserFormValues) => {
        const {username, password} = values;
        createUser({username: username.trim(), password});
    }, []);

    return (
        <Form
            layout="inline"
            onFinish={handleCreateUser}
            style={{marginBottom: 16}}
        >
            <Item
                name="username"
                rules={[{required: true, message: 'Введите логин'}, {min: 3}]}
            >
                <Input autoComplete="username" placeholder="Логин" allowClear />
            </Item>

            <Item
                name="password"
                rules={[{required: true, message: 'Введите пароль'}, {min: 6}]}
            >
                <Input
                    autoComplete="password"
                    placeholder="Пароль"
                    allowClear
                />
            </Item>
            <Item>
                <Button type="primary" htmlType="submit">
                    Добавить пользователя
                </Button>
            </Item>
        </Form>
    );
});

export default UserForm;
