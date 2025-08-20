/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import {Button, Space, Table, Typography} from 'antd';
import {useCallback, useMemo, useState} from 'react';
import {redirect} from 'react-router';

import type {UserDTO} from '@/services/types.ts';

import UserForm from '@/entities/users/UserForm.tsx';
import {getToken} from '@/services/auth';
import {deleteUser, getUsers} from '@/services/users.ts';

export function loader() {
    const token = getToken();
    if (!token) {
        throw redirect('/login');
    }
    if (token.role !== 'admin') {
        throw redirect('/');
    }
    return null;
}

const {Title} = Typography;

export function Component() {
    const [users, setUsers] = useState<UserDTO[]>(() => getUsers());

    const refreshUsers = useCallback(() => {
        setUsers(getUsers());
    }, []);

    const handleDelete = useCallback(
        (id: string) => {
            deleteUser(id);
            refreshUsers();
        },
        [refreshUsers],
    );

    const columns = useMemo(
        () => [
            {title: 'Логин', dataIndex: 'username', key: 'username'},
            {title: 'Роль', dataIndex: 'role', key: 'role'},
            {
                title: 'Действия',
                key: 'actions',
                render: (_: unknown, record: UserDTO) => (
                    <Space>
                        <Button
                            danger
                            onClick={() => {
                                handleDelete(record.id);
                            }}
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
        <div className="mx-auto my-12 max-w-[720px] p-6">
            <Title level={3} className="mt-0">
                Пользователи
            </Title>

            <UserForm onCreated={refreshUsers} />

            <Table
                rowKey="id"
                dataSource={users}
                columns={columns}
                pagination={{pageSize: 10}}
            />
        </div>
    );
}
