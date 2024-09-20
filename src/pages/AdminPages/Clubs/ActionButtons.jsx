import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import AlertNote from '../../../components/AlertNote';
import { useApproveClubMutation, useRejectClubMutation } from '../../../slices/admin/adminApiSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const ActionButtons = ({ club }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [actionType, setActionType] = useState(null); // To differentiate between approve and reject
    const [rejectionReason, setRejectionReason] = useState(''); // For custom rejection reason
    const [selectedReasons, setSelectedReasons] = useState([]); // For checkbox reasons
    const [approveClub, { isLoading: isApproving }] = useApproveClubMutation();
    const [rejectClub, { isLoading: isRejecting }] = useRejectClubMutation();
    const dispatch = useDispatch();

    const predefinedReasons = [
        'Incomplete information',
        'Invalid club details',
        'Inappropriate content',
        'Other'
    ];

    const handleCheckboxChange = (reason) => {
        setSelectedReasons(prev =>
            prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]
        );
    };

    const handleActionClick = (type) => {
        setActionType(type);
        setIsAlertOpen(true);
    };

    const handleConfirmAction = async (id) => {
        try {
            if (actionType === 'approve') {
                const response = await approveClub(id);
                toast.dismiss()
                toast.success(response.message || 'Club approved successfully');
            } else if (actionType === 'reject') {
                if (!selectedReasons.length && !rejectionReason.trim()) {
                    toast.dismiss()
                    toast.error('Please select or provide a reason for rejection');
                    return;
                }

                const reason = [...selectedReasons, rejectionReason].filter(Boolean).join(', ');
                const response = await rejectClub({ clubId: id, reason });
                toast.dismiss()
                toast.success(response.message || 'Club rejected successfully');
            }
            setIsAlertOpen(false);
        } catch (error) {
            toast.dismiss()

            toast.error(error?.data?.message || `Error processing club ${actionType}`);
        }
    };

    // The rejection content passed to AlertNote when actionType === 'reject'
    const rejectionContent = (
        <div>
            <div className="mb-4">
                {predefinedReasons.map((reason, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            type="checkbox"
                            id={reason}
                            name="reasons"
                            value={reason}
                            checked={selectedReasons.includes(reason)}
                            onChange={() => handleCheckboxChange(reason)}
                            className="mr-2"
                        />
                        <label htmlFor={reason}>{reason}</label>
                    </div>
                ))}
            </div>
            <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Provide additional reason (if any)"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
            ></textarea>
        </div>
    );

    return (
        <>
            <div className={`flex mt-4 justify-start items-center gap-3`}>
                {/* Conditionally render buttons based on club status */}
                {club?.registrationStatus === 'approved' || club?.registrationStatus === 'rejected' ? (
                    // Show only the 'View' button if already approved or rejected
                    <button
                        className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 focus:outline-none"
                        onClick={() => console.log('Viewing club details...')}
                    >
                        <FaEye className="text-blue-600" />
                    </button>
                ) : (
                    // Show Approve, Reject, and View buttons if the club status is pending
                    <>
                        <button
                            className="p-2 bg-green-100 rounded-full hover:bg-green-200 focus:outline-none"
                            onClick={() => handleActionClick('approve')}
                        >
                            <FaCheck className="text-green-600" />
                        </button>
                        <button
                            className="p-2 bg-red-100 rounded-full hover:bg-red-200 focus:outline-none"
                            onClick={() => handleActionClick('reject')}
                        >
                            <FaTimes className="text-red-600" />
                        </button>
                        <button
                            className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 focus:outline-none"
                            onClick={() => console.log('Viewing club details...')}
                        >
                            <FaEye className="text-blue-600" />
                        </button>
                    </>
                )}
            </div>

            {/* Render AlertNote for approve/reject actions */}
            <AlertNote
                open={isAlertOpen}
                setOpen={setIsAlertOpen}
                onConfirm={() => handleConfirmAction(club._id)}
                content={
                    actionType === 'approve'
                        ? 'Are you sure you want to approve this club registration?'
                        : rejectionContent
                }
                isLoading={isApproving || isRejecting}
            />
        </>
    );
};

export default ActionButtons;
