import { Image, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import { withAppContext } from '../Context';

function ModalList({ isModalVisible,
    setIsModalVisible,
    showModal,
    handleOk,
    handleCancel, singleData, getSingle, id,singleDataLoader }) {

    useEffect(() => {
        getSingle(id)
    }, [id])

    // useEffect(() => {
    //     console.log(singleData)
    // }, [singleData])
    return (
        // <div>
        <Modal title="Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className='singlePost'>
                <div className='dateImage'>
                    <div className='data'>
                    <h5 className='date'>Date: {new Date(singleData.date).toLocaleDateString()}</h5>
                    <h3>{singleData.title}</h3>
                    <p>{singleData.body}</p>
                    </div>
                    <div>
                        <Image
                            width={150}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                </div>
            </div>
            {singleDataLoader ?
                    <div className='loader'>
                        <Spin size="large" />
                    </div>
                    : null}

        </Modal>
        // </div>
    );
}

export default withAppContext(ModalList);
