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
    const [form] = Form.useForm();

    const handleCreateUser = useCallback(
        (values: UserFormValues) => {
            const {username, password} = values;
            createUser({username: username.trim(), password});
            form.resetFields();
            onCreated();
        },
        [onCreated, form],
    );

    return (
        <Form form={form} onFinish={handleCreateUser} className="flex flex-col">
            <Item
                name="username"
                rules={[
                    {required: true, message: 'Введите логин'},
                    {
                        min: 3,
                        message:
                            'Имя пользователя должно быть больше или равно 3 символам',
                    },
                ]}
            >
                <Input autoComplete="username" placeholder="Логин" allowClear />
            </Item>

            <Item
                name="password"
                rules={[
                    {required: true, message: 'Введите пароль'},
                    {
                        min: 3,
                        message:
                            'Пароль должен быть больше или равен 3 символам',
                    },
                ]}
            >
                <Password
                    autoComplete="new-password"
                    placeholder="Пароль"
                    allowClear
                />
            </Item>
            <Item>
                <Button type="primary" htmlType="submit" block>
                    Добавить пользователя
                </Button>
            </Item>
        </Form>
    );
});

export default UserForm;
