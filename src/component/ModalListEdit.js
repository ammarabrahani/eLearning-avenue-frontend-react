import { Button, DatePicker, Form, Image, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { withAppContext } from '../Context';

const { TextArea } = Input;
function ModalListEdit({ isModalVisible,
    setIsModalVisible,
    showModal,
    handleOk,
    handleCancel, singleData, getSingle, id, onUpdate }) {

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

    useEffect(() => {
        getSingle(id)
    }, [id])

    useEffect(() => {
        setData({
            body: singleData.body,
            title: singleData.title,
            date: singleData.date
        })
    }, [singleData])


    const clearState = () => {
        setData({
            body: '',
            title: '',
            date: ''
        })
    }
    function dataFn() {
        let obj = {

            "_id": singleData._id,
            "userId": singleData.userId,
            "title": data.title ? data.title : singleData.title,
            "body": data.body ? data.body : singleData.body,
            "date": new Date().toISOString()
        }

        onUpdate(obj, handleOk, clearState)
    }
    return (
        // <div>
        <Modal title="Post" visible={isModalVisible} onOk={() => { dataFn() }} onCancel={() => { handleCancel() }}>
            <div className='singlePost'>
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

export default withAppContext(ModalListEdit);
