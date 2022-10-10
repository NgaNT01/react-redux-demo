import React from "react";
import { Button, Table, Form, Modal, Input, notification } from 'antd';
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from "../../store/user";

const User = () => {
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    // const [dataSource, setDataSource] = useState([
    //     {
    //         key: '1',
    //         id: 1,
    //         name: 'Tấn Ngà',
    //         birthDay: '01/06/2001',
    //         teamId: '3',
    //     },
    //     {
    //         key: '2',
    //         id: 2,
    //         name: 'Hiếu Ngô',
    //         birthDay: '31/12/1998',
    //         teamId: '3',
    //     },
    //     {
    //         key: '3',
    //         id: 3,
    //         name: 'Hải Triệu',
    //         birthDay: '03/04/1992',
    //         teamId: '2',
    //     },
    //     {
    //         key: '4',
    //         id: 4,
    //         name: 'Định Thái',
    //         birthDay: '04/03/1992',
    //         teamId: '1',
    //     },
    //     {
    //         key: '5',
    //         id: 5,
    //         name: 'Hồng Minh',
    //         birthDay: '03/12/1998',
    //         teamId: '2',
    //     },
    // ]);

    const listUser = useSelector(state => state.user.listUser);
    const dispatch = useDispatch();

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

    const onAddUserClicked = () => {
        if (userInfo) {
            dispatch(
                addUser({
                    id: userInfo.id,
                    name: userInfo.name,
                    birthDay: userInfo.birthDay,
                    teamId: userInfo.teamId,
                })
            )

            setUserInfo(null);
        }
    }

    const openNotificationEditSucces = () => {
        notification['success']({
            message: 'Edit Alert',
            description: 'Success! You edited this user!',
        });
    }

    const openNotificationDeleteSucces = () => {
        notification['success']({
            message: 'Delete Alert',
            description: 'Success! You deleted this user!',
        });
    }

    const openNotificationAddSuccess = () => {
        notification['success']({
            message: 'Add user alert',
            description: 'Success! You have just added an user!',
        });
    }

    const onDeleteUser = (record) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this user ?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                // setDataSource(pre => {
                //     return pre.filter(user => user.id !== record.id);
                // });
                openNotificationDeleteSucces();
            }
        });
    }

    const onEditUser = (record) => {
        setVisibleEdit(true);
        setUserInfo({ ...record });
    }

    const onAddUser = () => {
        setVisibleAdd(true);
        setUserInfo(null);
    }



    return (
        <div className="userTab">
            <div className="userTabHeader">
                <span style={{ fontWeight: 'bolder' }}>User</span>
                <div className="btnSave">
                    <Button type="primary" size="middle" onClick={onAddUser}>Add a new user</Button>
                </div>
                <Modal
                    title="Add user"
                    open={visibleAdd}
                    okText="Save"
                    onOk={() => {
                        onAddUserClicked();
                        setVisibleAdd(false);
                        openNotificationAddSuccess();
                    }}
                    onCancel={() => { setVisibleAdd(false) }}
                >
                    <Form layout="vertical">
                        <Form.Item
                            label="ID"
                            required="true"
                        >
                            <Input placeholder="Enter ID of user" onChange={e => {
                                setUserInfo(pre => {
                                    return { ...pre, id: e.target.value }
                                });
                            }}></Input>
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            required="true"
                        >
                            <Input placeholder="Enter name of user" onChange={e => {
                                setUserInfo(pre => {
                                    return { ...pre, name: e.target.value }
                                });
                            }}></Input>
                        </Form.Item>
                        <Form.Item
                            label="Birth Day"
                            required="true"
                        >
                            <Input placeholder="Enter birthday of user" onChange={e => {
                                setUserInfo(pre => {
                                    return { ...pre, birthDay: e.target.value }
                                });
                            }}></Input>
                        </Form.Item>
                        <Form.Item
                            label="Team ID"
                            required="true"
                        >
                            <Input placeholder="Enter team name" onChange={e => {
                                setUserInfo(pre => {
                                    return { ...pre, teamId: e.target.value }
                                });
                            }}></Input>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table
                    bordered
                    dataSource={listUser}
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
                        // setDataSource(pre => {
                        //     return pre.map(user => {
                        //         if (user.id === userInfo.id) {
                        //             return userInfo;
                        //         }
                        //         else return user;
                        //     });
                        // });
                        setVisibleEdit(false);
                        openNotificationEditSucces();
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