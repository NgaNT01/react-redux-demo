import React from "react";
import { Button, Table, Modal, Input, Form } from 'antd';
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './styles.css';

const Team = () => {
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [teamInfo, setTeamInfo] = useState(null);
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            id: 1,
            name: 'Newji VR',
        },
        {
            key: '2',
            id: 2,
            name: 'CIMB',
        },
        {
            key: '3',
            id: 3,
            name: 'Air Circle',
        },
        {
            key: '4',
            id: 4,
            name: '2nd B@r',
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
            key: 'actions',
            title: 'Actions',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => { onEditTeam(record) }} />
                        <DeleteOutlined onClick={() => { onDeleteTeam(record) }} style={{ color: 'red', marginLeft: '12px' }} />
                    </>
                )
            }
        },
    ];

    const onDeleteTeam = (record) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this team ?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                setDataSource(pre => {
                    return pre.filter(team => team.id !== record.id);
                });
            }
        });
    }

    const onEditTeam = (record) => {
        setVisibleEdit(true);
        setTeamInfo({ ...record });
    }

    const handleAddTeam = () => {
        const newTeam = {
            key: `${Math.random() * 1000}`,
            id: parseInt(Math.random() * 1000),
            name: 'Newji VR',
        };
        setDataSource(pre => {
            return [...pre, newTeam];
        });
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
                    dataSource={dataSource}
                    columns={columns}
                    tableLayout='fixed'
                    pagination={false}
                >
                </Table >
                <Modal
                    title="Edit team"
                    open={visibleEdit}
                    okText="Save"
                    onOk={() => {
                        setDataSource(pre => {
                            return pre.map(team => {
                                if (team.id === teamInfo.id) {
                                    return teamInfo;
                                }
                                else return team;
                            });
                        });
                        setVisibleEdit(false);
                    }}
                    onCancel={() => { setVisibleEdit(false) }}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name" required="true">
                            <Input value={teamInfo?.name} onChange={e => {
                                setTeamInfo(pre => {
                                    return { ...pre, name: e.target.value }
                                });
                            }}></Input>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div >
    );
}

export default Team;