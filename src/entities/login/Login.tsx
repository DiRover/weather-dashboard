import {Button, Form, Input, Typography} from 'antd';
import {useNavigate} from 'react-router';
import {redirect} from 'react-router';

import {createAccessToken, getToken, saveToken} from '@/services/auth';

export function loader() {
    if (getToken()) {
        throw redirect('/');
    }
    return null;
}

const {Item} = Form;
const {Title} = Typography;

export function Component() {
    const navigate = useNavigate();

    async function handleFinish(values: {username: string; password: string}) {
        const token = await createAccessToken(
            values.username.trim(),
            values.password,
        );
        saveToken(token);
        navigate('/');
    }

    return (
        <div
            style={{
                maxWidth: 360,
                margin: '72px auto',
                padding: 24,
                border: '1px solid #e5e7eb',
                borderRadius: 8,
            }}
        >
            <Title level={3} style={{marginTop: 0}}>
                Вход
            </Title>

            <Form
                layout="vertical"
                onFinish={handleFinish}
                autoComplete="on"
                requiredMark={false}
                initialValues={{username: '', password: ''}}
                validateTrigger={['onBlur', 'onSubmit']}
            >
                <Item
                    label="Логин"
                    name="username"
                    rules={[
                        {required: true, message: 'Введите логин'},
                        {min: 3, message: 'Минимум 3 символа'},
                    ]}
                >
                    <Input
                        placeholder="Введите логин"
                        autoComplete="username"
                        allowClear
                    />
                </Item>

                <Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {required: true, message: 'Введите пароль'},
                        {min: 6, message: 'Минимум 6 символов'},
                    ]}
                >
                    <Input.Password
                        placeholder="Введите пароль"
                        autoComplete="current-password"
                    />
                </Item>

                <Item style={{marginBottom: 0}}>
                    <Button type="primary" htmlType="submit" block>
                        Войти
                    </Button>
                </Item>
            </Form>
        </div>
    );
}
