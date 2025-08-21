/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import type {ColumnsType} from 'antd/es/table';

import {ArrowLeftOutlined} from '@ant-design/icons';
import {Button, Space, Table, Typography} from 'antd';
import {useCallback, useMemo, useState} from 'react';
import {redirect, useNavigate} from 'react-router';

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
    const navigate = useNavigate();

    const refreshUsers = useCallback(() => {
        setUsers(getUsers());
    }, []);

    const handleGoBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleDelete = useCallback(
        (id: string) => {
            deleteUser(id);
            refreshUsers();
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
        <>
            <div className="mb-4 flex items-center gap-4 self-start">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handleGoBack}
                    type="text"
                    size="large"
                />
                <Title level={3} className="!m-0">
                    Пользователи
                </Title>
            </div>

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
}
