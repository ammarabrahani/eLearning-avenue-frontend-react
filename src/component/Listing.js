import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Spin } from 'antd';
import axios from 'axios';
import { Modal, Button } from 'antd';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons'
import './list.css'
import { withAppContext } from '../Context';
import ModalList from './ModalList';
import ModalListEdit from './ModalListEdit';
import ModalListAdd from './AddPost';
import { withRouter } from 'react-router-dom';

const { Column, ColumnGroup } = Table;

function Listing({ data, getPosts, dataLoader, deletePost,logout, ...props }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [id, setId] = useState('')
    const [obj, setobj] = useState('')

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            props.history.push('/')
        }
    }, [])

    const showModal = (record) => {
        setIsModalVisible(true);
        setId(record._id)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const showModal2 = (record) => {
        setIsModalVisible2(true);
        setId(record._id)
    };

    const handleOk2 = () => {
        setIsModalVisible2(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const [isModalVisible3, setIsModalVisible3] = useState(false);

    const showModal3 = (record) => {
        setIsModalVisible3(true);
        setId(record._id)
    };

    const handleOk3 = () => {
        setIsModalVisible3(false);
    };

    const handleCancel3 = () => {
        setIsModalVisible3(false);
    };

    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div className='listPage'>
            <div className='tableBox'>
                <div>
                <Button className='addPostButton' onClick={showModal3}>Add Post</Button>
                <Button className='logOut' onClick={()=>logout(props)}>Logout</Button>
                </div>
                <Table dataSource={data}>
                    {/* <ColumnGroup title="Name"> */}
                    <Column title="S NO" render={(text, record, index) => {
                        return (
                            <>
                                {index}
                            </>
                        )
                    }} />
                    <Column title="date" render={(text, record, index) => {
                        return (
                            <div onClick={() => console.log(new Date(record.date))}>
                                {new Date(record.date).toLocaleDateString()}
                            </div>
                        )
                    }} />
                    <Column title="Title" dataIndex="title" key="title" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <div onClick={() => showModal(record)}><EyeOutlined /></div>
                                <div onClick={() => showModal2(record)}><EditOutlined /></div>
                                <div onClick={()=>deletePost(record._id)}><DeleteOutlined /></div>
                            </Space>
                        )}
                    />
                </Table>
                {dataLoader ?
                    <div className='loader'>
                        <Spin size="large" />
                    </div>
                    : null}
            </div>

            <ModalList
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                showModal={showModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
                id={id}
            />

            <ModalListEdit
                isModalVisible={isModalVisible2}
                setIsModalVisible={setIsModalVisible2}
                showModal={showModal2}
                handleOk={handleOk2}
                handleCancel={handleCancel2}
                id={id}
            />

            <ModalListAdd
                isModalVisible={isModalVisible3}
                setIsModalVisible={setIsModalVisible3}
                showModal={showModal3}
                handleOk={handleOk3}
                handleCancel={handleCancel3}
                id={id}
            />

        </div>

    );
}

export default withAppContext(withRouter(Listing));
