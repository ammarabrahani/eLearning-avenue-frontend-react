import { Button, DatePicker, Form, Image, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { withAppContext } from '../Context';

const { TextArea } = Input;
function ModalListAdd({ isModalVisible,
    setIsModalVisible,
    showModal,
    handleOk,
    handleCancel,addPost }) {

    // function onChange(date, dateString) {
    //     console.log(date, dateString);
    // }
    // const postForm = useRef()


    // const onReset = () => {
    //     postForm.current.resetFields();
    // };
    const [data, setData] = useState({
        body: '',
        title: '',
        date: ''
    })




    const clearState = () => {
        setData({
            body: '',
            title: '',
            date: ''
        })
    }
    function dataFn() {
        let uid = localStorage.getItem('uid')
        let obj = {

            "userId": uid,
            "title": data.title,
            "body": data.body,
            "date": new Date().toISOString()
        }

        addPost(obj, handleOk, clearState)
    }
    return (
        // <div>
        <Modal title="Post" visible={isModalVisible} onOk={() => { dataFn() }} onCancel={() => { handleCancel() }}>
            <div className='singlePost'>

                {/* <Input type="date" onChange={(ev) => {
                    let objj = {
                        ...data,
                        title: ev.target.value
                    }
                    setData(objj)
                }} /> */}
                <p>Title</p>
                <Input value={data.title} onChange={(ev) => {
                    let objj = {
                        ...data,
                        title: ev.target.value
                    }
                    setData(objj)
                }} />
                <p>Body</p>
                <Input value={data.body} onChange={(ev) => {
                    let objj = {
                        ...data,
                        body: ev.target.value

                    }
                    setData(objj)
                }} />

            </div>


        </Modal>
        // </div>
    );
}

export default withAppContext(ModalListAdd);
