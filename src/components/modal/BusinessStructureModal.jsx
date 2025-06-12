import { Modal } from 'antd';
import { FaUser } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';

export default function BusinessStructureModal({ isModalOpen, handleOk, handleCancel, tempSelectedValue, setTempSelectedValue }) {

    return (
        <Modal
            title={<h2 className="text-lg font-semibold text-[#262626]">Business structure</h2>}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            centered
            width={500}
        >
            <hr className='text-border my-5' />
            <p className="mb-4">
                Is this a solo business or do others manage bookings too?
            </p>

            <div className="flex gap-4 mb-6 bg-white">
                <div
                    onClick={() => setTempSelectedValue('solo')}
                    className={`flex flex-col items-center justify-center flex-1 py-12 rounded-lg cursor-pointer border ${tempSelectedValue === 'solo'
                        ? 'border-primary01 bg-highlight01'
                        : 'border-border'
                        }`}
                >
                    <FaUser className={`text-2xl mb-2 ${tempSelectedValue === 'solo' ? 'text-primary01' : 'text-gray-400'
                        }`} />
                    <span
                        className={`font-medium ${tempSelectedValue === 'solo' ? 'text-primary01' : 'text-gray-700'
                            }`}
                    >
                        It’s just me
                    </span>
                </div>

                <div
                    onClick={() => setTempSelectedValue('team')}
                    className={`flex flex-col items-center justify-center flex-1 py-12 rounded-lg cursor-pointer border ${tempSelectedValue === 'team'
                        ? 'border-primary01 bg-highlight01'
                        : 'border-border'
                        }`}
                >
                    <HiUserGroup className={`text-2xl mb-2 ${tempSelectedValue === 'team' ? 'text-primary01' : 'text-gray-400'
                        }`} />
                    <span
                        className={`font-medium ${tempSelectedValue === 'team' ? 'text-primary01' : 'text-gray-700'
                            }`}
                    >
                        I have a team
                    </span>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <button
                    onClick={handleCancel}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleOk}
                    className="w-1/2 px-4 py-2 text-white rounded-lg bg-gray-900 font-semibold cursor-pointer"
                >
                    Confirm
                </button>
            </div>
        </Modal>
    );
}
