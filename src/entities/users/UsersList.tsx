/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import type {ColumnsType} from 'antd/es/table';

import {Button, Modal, Space, Table, Typography} from 'antd';
import {useAtomValue} from 'jotai/index';
import {memo, useCallback, useMemo, useState} from 'react';
import {redirect} from 'react-router';

import type {UserDTO} from '@/helpers/types.ts';

import {atomDarkMode} from '@/entities/atoms/darkMode.ts';
import UserForm from '@/entities/users/UserForm.tsx';
import {getToken} from '@/helpers/auth';
import {deleteUser, getUsers} from '@/helpers/users.ts';
import {adminAccess} from '@/routes/access.ts';

export function loader() {
    const token = getToken();
    //ещё одна проверка, чтобы ниже не проверять
    if (!token) {
        throw redirect('/login');
    }

    const role = token.role;
    if (!adminAccess.includes(role)) {
        throw new Response('Forbidden Error', {status: 403});
    }
    return null;
}

const {Title} = Typography;

//список пользователей

export const Component = memo(() => {
    const [users, setUsers] = useState<UserDTO[]>(() => getUsers());
    const dark = useAtomValue(atomDarkMode);

    const refreshUsers = useCallback(() => {
        setUsers(getUsers());
    }, []);

    const handleDelete = useCallback(
        (user: UserDTO) => {
            Modal.confirm({
                title: 'Подтверждение удаления',
                content: `Вы уверены, что хотите удалить пользователя "${user.username}"?`,
                okText: 'Удалить',
                cancelText: 'Отмена',
                okType: 'danger',
                onOk: () => {
                    deleteUser(user.id);
                    refreshUsers();
                },
            });
        },
        [refreshUsers],
    );

    const columns = useMemo<ColumnsType<UserDTO>>(
        () => [
            {title: 'Логин', dataIndex: 'username', key: 'username'},
            {title: 'Роль', dataIndex: 'role', key: 'role'},
            {
                align: 'center',
                title: 'Действия',
                key: 'actions',
                render: (_: unknown, record: UserDTO) => (
                    <Space>
                        <Button
                            danger
                            onClick={() => {
                                handleDelete(record);
                            }}
                            //сохраняю цвета для тёмного режима
                            className="!border-red-600 !bg-white !text-red-600"
                        >
                            Удалить
                        </Button>
                    </Space>
                ),
            },
        ],
        [handleDelete],
    );

    return (
        <>
            <Title
                level={3}
                className={`place-self-start ${dark ? '!text-gray-100' : ''}`}
            >
                Пользователи
            </Title>

            <div className="grid w-full grid-cols-6 gap-4">
                <UserForm onCreated={refreshUsers} />

                <div className="col-span-5">
                    <Table
                        rowKey="id"
                        dataSource={users}
                        columns={columns}
                        pagination={{pageSize: 10}}
                    />
                </div>
            </div>
        </>
    );
});
