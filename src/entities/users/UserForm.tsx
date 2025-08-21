/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import {Button, Form, Input} from 'antd';
import {memo, useCallback} from 'react';

import type {UserFormValues} from '@/services/types.ts';

import {createUser} from '@/services/users.ts';

const {Item} = Form;

interface UserFormProps {
    onCreated: () => void;
}

const {Password} = Input;

const UserForm = memo(({onCreated}: UserFormProps) => {
    const handleCreateUser = useCallback(
        (values: UserFormValues) => {
            const {username, password} = values;
            createUser({username: username.trim(), password});
            onCreated();
        },
        [onCreated],
    );

    return (
        <Form layout="inline" onFinish={handleCreateUser} className="">
            <Item
                name="username"
                rules={[{required: true, message: 'Введите логин'}, {min: 3}]}
            >
                <Input autoComplete="username" placeholder="Логин" allowClear />
            </Item>

            <Item
                name="password"
                rules={[{required: true, message: 'Введите пароль'}, {min: 3}]}
            >
                <Password
                    autoComplete="new-password"
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
