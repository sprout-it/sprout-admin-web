import React, { useState, useRef, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Space, Button, Tabs, Badge, Dropdown } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
const { TabPane } = Tabs;

const originData = [];

for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        description: 32,
        note: "",
        img: `London Park no. ${i}`,
    });
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Users = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [state, setState] = useState('')
    const [editingKey, setEditingKey] = useState('');
    const searchInput = useRef()
    const [users, setUsers] = useState([])
    const [banUsers, setBanUsers] = useState([])

    const getUsers = async () => {
        const getUsers = await fetch('https://602ce9ca30ba72001722392a.mockapi.io/MockAdminSprout')
        const getUsersBody = await getUsers.json()
        setUsers(getUsersBody)
    }
    const getBanUsers = async () => {
        const getUsers = await fetch('https://602ce9ca30ba72001722392a.mockapi.io/admin-ban')
        const getUsersBody = await getUsers.json()
        setBanUsers(getUsersBody)
    }

    useEffect(() => {
        getUsers()
        getBanUsers()
    }, [])

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
              </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: text =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setState({ searchText: '' });
    };

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.length - b.name.length,
            editable: true,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            width: '15%',
            ...getColumnSearchProps('description'),
            sorter: (a, b) => a.email.length - b.email.length,
            editable: true,
        },
        {
            title: 'Image',
            width: '15%',
            render: (t, record, index) => {
                return <img src={t.img} alt={`img ${index}`} />
            },
            editable: true,
        },
        {
            title: 'Telephone Number',
            dataIndex: 'tel',
            width: '15%',
            sorter: (a, b) => a.tel.length - b.tel.length,
            ...getColumnSearchProps('img'),
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button
                            type="primary"
                            href="javascript:;"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button danger>Cancel</Button>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <Button type="default">
                                Edit
                        </Button>
                        </Typography.Link>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => ''}>
                            <Button type="primary" danger>
                                Ban
                            </Button>
                        </Typography.Link>
                    </>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Created Date',
                dataIndex: 'createdAt',
                width: '25%',
                editable: true,
            },
            {
                title: 'Latitude',
                dataIndex: 'lat',
                width: '25%',
                editable: true,
            },
            {
                title: 'Longtitude',
                dataIndex: 'lng',
                width: '25%',
                editable: true,
            },
            {
                title: 'Status',
                key: 'state',
                width: '25%',
                render: () => <span>Active</span>
            },
        ];

        const mergedColumns = columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });

        return <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                columns={mergedColumns}
                dataSource={[record]}
                pagination={false}
            />
        </Form>;
    };

    return (
        <>
            <Tabs type="card">
                <TabPane tab="All Users" key="1">
                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={users}
                            columns={mergedColumns}
                            expandable={{ expandedRowRender }}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: cancel,
                            }}
                        />
                    </Form>
                </TabPane>
                <TabPane tab="Ban Users" key="2">
                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={banUsers}
                            columns={mergedColumns}
                            expandable={{ expandedRowRender }}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: cancel,
                            }}
                        />
                    </Form>
                </TabPane>
                {/* <TabPane tab="Others" key="3">
                    Content of Tab Pane 3
                </TabPane> */}
            </Tabs>
        </>
    );
};

export default Users