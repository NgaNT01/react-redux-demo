import React from "react";
import { Button, Space, Table, Form, Modal, Input } from 'antd';
import Column from "antd/lib/table/Column";
import { useState } from "react";
import { ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './styles.css';
import { isVisible } from "@testing-library/user-event/dist/utils";

const { confirm } = Modal;

const User = () => {
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            id: 1,
            name: 'Tấn Ngà',
            birthDay: '01/06/2001',
            teamId: '3',
        },
        {
            key: '2',
            id: 2,
            name: 'Hiếu Ngô',
            birthDay: '31/12/1998',
            teamId: '3',
        },
        {
            key: '3',
            id: 3,
            name: 'Hải Triệu',
            birthDay: '03/04/1992',
            teamId: '2',
        },
        {
            key: '4',
            id: 4,
            name: 'Định Thái',
            birthDay: '04/03/1992',
            teamId: '1',
        },
        {
            key: '5',
            id: 5,
            name: 'Hồng Minh',
            birthDay: '03/12/1998',
            teamId: '2',
        },
    ]);

    const columns = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'birthDay',
            title: 'Birth Day',
            dataIndex: 'birthDay',
        },
        {
            key: 'teamId',
            title: 'Team ID',
            dataIndex: 'teamId',
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => { onEditUser(record) }} />
                        <DeleteOutlined onClick={() => { onDeleteUser(record) }} style={{ color: 'red', marginLeft: '12px' }} />
                    </>
                )
            }
        },
    ];

    const onDeleteUser = (record) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this user ?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                setDataSource(pre => {
                    return pre.filter(user => user.id !== record.id);
                });
            }
        });
    }

    const onEditUser = (record) => {
        setVisibleEdit(true);
        setUserInfo({ ...record });
    }

    const handleAddUser = () => {
        const newUser = {
            key: `${Math.random() * 1000}`,
            id: parseInt(Math.random() * 1000),
            name: 'Định Thái',
            birthDay: '04/03/1992',
            teamId: '1',
        };
        setDataSource(pre => {
            return [...pre, newUser];
        });
    }

    return (
        <div className="userTab">
            <div className="userTabHeader">
                <span style={{ fontWeight: 'bolder' }}>User</span>
                <div className="btnSave">
                    <Button type="primary" size="middle" onClick={handleAddUser}>Add a new user</Button>
                </div>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    tableLayout='fixed'
                    pagination={false}
                >
                </Table >
                <Modal
                    title="Edit user"
                    open={visibleEdit}
                    okText="Save"
                    onOk={() => {
                        setDataSource(pre => {
                            return pre.map(user => {
                                if (user.id === userInfo.id) {
                                    return userInfo;
                                }
                                else return user;
                            });
                        });
                        setVisibleEdit(false);
                    }}
                    onCancel={() => { setVisibleEdit(false) }}
                >
                    <Form layout="vertical">
                        <Form.Item
                            label="Name"
                            required="true"
                        >
                            <Input value={userInfo?.name} onChange={e => {
                                setUserInfo(pre => {
                                    return { ...pre, name: e.target.value }
                                });
                            }}></Input>
                        </Form.Item>
                        <Form.Item
                            label="Birth Day"
                            required="true"
                        >
                            <Input value={userInfo?.birthDay} onChange={e => {
                                setUserInfo(pre => {
                                    return { ...pre, birthDay: e.target.value }
                                });
                            }}></Input>
                        </Form.Item>
                        <Form.Item
                            label="Team ID"
                            required="true"
                        >
                            <Input value={userInfo?.teamId} onChange={e => {
                                setUserInfo(pre => {
                                    return { ...pre, teamId: e.target.value }
                                });
                            }}></Input>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div >
    );
}

export default User;