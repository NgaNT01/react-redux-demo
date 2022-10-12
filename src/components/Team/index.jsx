import React from "react";
import { Button, Table, Modal, Input, Form, notification, Select } from 'antd';
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import './styles.css';
import { useSelector, useDispatch } from "react-redux";
import { deleteTeam, addTeam, updateTeam } from "../../store/team";

const Team = () => {
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleView, setVisibleView] = useState(false);
    const [editId, setEditId] = useState(null);
    const [teamInfo, setTeamInfo] = useState(null);
    const listTeam = useSelector(state => state.team.listTeam);
    const listUser = useSelector(state => state.user.listUser);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [formUser] = Form.useForm();
    const {Option} = Select;

    const initForm = {
        name: '',
    };

    const listUserOfTeam = [];
    const listUserNotOnTeam = [];

    listUser.forEach(element => {
        element.teamId.forEach(teamId => {
            if (teamId === editId) listUserOfTeam.push(element);
        });
    });

    listUser.filter(user => {
        if (user.teamId.findIndex(teamId => teamId === editId) === -1) listUserNotOnTeam.push(user);
    });

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
            key: 'actions',
            title: 'Actions',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => onEditTeam(record)} />
                        <DeleteOutlined onClick={() => onDeleteTeam(record)} style={{ color: 'red', marginLeft: '12px' }} />
                        <EyeOutlined onClick={() => onViewTeam(record)} style={{ color: 'red', marginLeft: '12px' }} />
                    </>
                )
            }
        },
    ];

    const userColumns = [
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
                const arrOfName = [];
                record.teamId.forEach(element => {
                    arrOfName.push(listTeam.find(team => team.id === element)?.name);
                })
                return (<span>{arrOfName.join(', ')}</span>)
            }
        },
    ];

    const onDeleteTeam = (record) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this team ?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                dispatch(deleteTeam(record));
                notification['success']({
                    message: 'Delete team',
                    description:
                        'Success!You delete the team',
                });
            }
        });
    }

    const onEditTeam = record => {
        setEditId(record.id);
        setVisibleEdit(true);
    }

    const onViewTeam = record => {
        setEditId(record.id);
        setVisibleView(true);
    };

    const handleAddTeam = record => {
        setEditId(null);
        setVisibleEdit(true);
    }

    useEffect(() => {
        if (editId) {
            const data = listTeam.find(team => team.id === editId)
            form.setFieldsValue(data)
        } else form.setFieldsValue(initForm);

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

    const onFinish = values => {
        if (editId) {
            dispatch(updateTeam({
                id: editId,
                name: values.name,
            }));
        }
        else {
            dispatch(addTeam({
                id: parseInt(Math.random() * 1000),
                name: values.name,
            }))
        }
        openNotification();
        if (!editId) form.setFieldsValue(initForm);
    }

    const onFinishAddUser = values => {

    }

    const onAddUserToTeam = () => {

    }

    return (
        <div className="teamTab">
            <div className="teamTabHeader">
                <span style={{ fontWeight: 'bolder' }}>Team</span>
                <div className="btnSave">
                    <Button type="primary" size="middle" onClick={handleAddTeam}>Add a new team</Button>
                </div>
                <Table
                    bordered
                    dataSource={listTeam}
                    columns={columns}
                >
                </Table >
                <Modal
                    title={editId ? "Edit form" : "Add form"}
                    open={visibleEdit}
                    okText="Save"
                    onCancel={() => setVisibleEdit(false)}
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
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={async () => {
                                try {
                                    const values = await form.validateFields();
                                    setVisibleEdit(false);
                                } catch (errorInfo) {
                                    console.log('Failed:', errorInfo);
                                }
                            }}>Save</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="Select the User"
                    open={visibleView}
                    onCancel={() => setVisibleView(false)}
                    footer={null}
                >
                    <Form form={formUser} onFinish={onFinishAddUser}>
                        <Form.Item
                            name="name"
                        >
                            <Select>
                                {listUserNotOnTeam.map(user => {
                                    return (
                                        <Option key={user.id} value={user.id}>{user.name}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={onAddUserToTeam}>Add</Button>
                        </Form.Item>
                    </Form>
                    <span style={{fontWeight: 'bold'}}>User of the selected Team</span>
                    <Table
                        bordered
                        dataSource={listUserOfTeam}
                        columns={userColumns}
                        pagination={false}
                    ></Table>
                </Modal>
            </div>
        </div >
    );
}

export default Team;