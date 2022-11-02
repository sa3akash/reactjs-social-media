import React from 'react';
import { Modal } from '@mantine/core';
import "./ShareModal.css";
import PostShare from '../postShare/PostShare'

const ShareModal = ({openModal, setOpenModal}) => {
  return (
    <div>
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Share Your Post"
        centered
        size={"50%"}
      >
        <div className='postshare-modal'>
          <PostShare />
        </div>
      </Modal>
    </div>
  )
}

export default ShareModal