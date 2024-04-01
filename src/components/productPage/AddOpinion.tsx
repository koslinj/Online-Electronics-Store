import { useState } from 'react';
import { Button, ConfigProvider, Modal, Rate, Input } from 'antd';

const { TextArea } = Input;

export const AddOpinion = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <button
        className='rounded-xl bg-black text-white hover:bg-gray-700 duration-150 p-2'
        onClick={showModal}
      >
        Add Opinion
      </button>
      <Modal
        title={<p className='text-lg font-bold'>Dodaj opinię</p>}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <button
              className='rounded-lg bg-black text-white hover:bg-gray-700 duration-150 p-2'
            >
              Dodaj opinię
            </button>
          </>
        )}
      >
        <ConfigProvider
          theme={{
            components: {
              Rate: {
                starBg: 'rgb(200 200 200)',
                starSize: 30
              }
            }
          }}
        >
          <div className='flex justify-center items-center flex-col gap-y-2 py-5 my-5 border-y-2 border-y-gray-300'>
            <p>Twoja ocena produktu</p>
            <Rate
              allowClear={false}
              count={6}
              defaultValue={1}
            />
          </div>
          <p className='font-semibold text-base'>Napisz, co myślisz o tym produkcie</p>
          <p className='text-gray-500'>Pamiętaj, że Twoja opinia powinna dotyczyć produktu i jego funkcjonalności.</p>
          <p className='mt-6'>Co sądzisz o tym produkcie?(opcjonalnie)</p>
          <TextArea autoSize={{ minRows: 3, maxRows: 10 }} placeholder="Napisz 2-3 zdania" maxLength={1000} />
        </ConfigProvider>
      </Modal>
    </>
  );
};
