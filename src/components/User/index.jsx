import React, { useEffect, useId } from "react";
import { Button, Table, Form, Modal, Input, Select, notification } from 'antd';
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
import { addUser, updateUser,deleteUser } from "../../store/user";

const User = () => {
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const listUser = useSelector(state => state.user.listUser);
    const listTeam = useSelector(state => state.team.listTeam);
    const dispatch = useDispatch();
    const { Option } = Select;
    const [form] = Form.useForm();

    const initForm = {
        name: '',
        birthDay: '',
        teamId: '',
    }

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
            title: 'Team Name',
            render: (record) => {
                const teamId = listUser.find(user => user.id === record.id).teamId;
                switch (teamId) {
                    case 1: return (<span>Newji VR</span>)
                    case 2: return (<span>Air Circle</span>)
                    case 3: return (<span>CIMB</span>)
                    case 4: return (<span>2nd B@r</span>)
                }
            }
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (_, record, index) => {
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
                dispatch(deleteUser(record))
            }
        });
        notification['success']({
            message: 'Delete user',
            description:
              'Success!You delete the user',
          });
    }

    const onEditUser = (record, index) => {
        setEditId(record.id); 
        setVisibleEdit(true);
    }

    const handleAddUser = () => {
        setEditId(null);
        setVisibleEdit(true);
    }

    const onFinish = (values) => {
        if (editId) {
            dispatch(updateUser({
                id: editId,
                name: values.name,
                birthDay: values.birthDay,
                teamId: parseInt(values.teamId),
            }));
        }
        else {
            dispatch(addUser({
                id: parseInt(Math.random()*1000),
                name: values.name,
                birthDay: values.birthDay,
                teamId: parseInt(values.teamId),
            }))
        }
        openNotification();
    }

    useEffect(() => {
        if (editId) {
            const data = listUser.find(item => item.id === editId)
            form.setFieldsValue(data)
        } else {
            form.setFieldsValue(initForm);
        }

    }, [editId])

    const openNotification = () => {
        if (editId) {
            notification['success']({
                message: 'Edit user',
                description:
                  'Success!You edited the user',
              });
        }
        else {
            notification['success']({
                message: 'Add user',
                description:
                  'Success!You added the user',
              });
        }
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
                    dataSource={listUser}
                    columns={columns}
                    tableLayout='fixed'
                    pagination={false}
                >
                </Table >
            </div>
            <Modal
                title={editId ? "Edit form" : "Add form"}
                open={visibleEdit}
                okText="Save"
                onCancel={() => { setVisibleEdit(false) }}
                footer={null}
                destroyOnClose={true}
            >
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Name"
                        required="true"
                        rules={[{
                            required: true,
                            message: "Please enter name!"
                        }]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        name="birthDay"
                        label="Birth Day"
                        required="true"
                        rules={[{
                            required: true,
                            message: "Please enter birthday!"
                        }]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        name="teamId"
                        label="Team Name"
                        required="true"
                        rules={[{
                            required: true,
                            message: "Please enter team name!"
                        }]}
                    >
                        <Select>
                            {listTeam.map((team) => {
                                return (
                                    <Option key={team.id} values={team.id}>{team.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" onClick={() => {setVisibleEdit(false);}}>Save</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    );
}

export default User;