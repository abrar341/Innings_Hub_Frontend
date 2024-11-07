import React, { useState } from 'react';
import { FaCheck, FaInfoCircle, FaTimes } from 'react-icons/fa';
import AlertNote from '../../../components/AlertNote';
import { useApproveClubMutation, useRejectClubMutation } from '../../../slices/admin/adminApiSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const ActionButtons = ({ club }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [approveClub, { isLoading: isApproving }] = useApproveClubMutation();
    const [rejectClub, { isLoading: isRejecting }] = useRejectClubMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const predefinedReasons = [
        'Phone',
        'Invalid club details',
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
                toast.success(response.message || 'Club approved successfully');
            } else if (actionType === 'reject') {
                if (!selectedReasons.length && !rejectionReason.trim()) {
                    toast.error('Please select or provide a reason for rejection');
                    return;
                }

                const reason = [...selectedReasons, rejectionReason].filter(Boolean).join(', ');
                const response = await rejectClub({ clubId: id, reason });
                toast.success(response.message || 'Club rejected successfully');
            }
            setIsAlertOpen(false);
        } catch (error) {
            toast.error(error?.data?.message || `Error processing club ${actionType}`);
        }
    };

    const handleViewDetail = () => {
        navigate('club-detail', { state: { clubInfo: club } });
    };

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

    // Check if the current path ends with `/club-detail`
    const isClubDetailPage = /\/club-detail$/.test(location.pathname);

    return (
        <>
            <div className={`flex mt-4 justify-start items-center gap-3`}>
                {club?.registrationStatus === 'approved' || club?.registrationStatus === 'rejected' ? (
                    !isClubDetailPage && (

                        <button onClick={handleViewDetail} className="flex items-center bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 text-sm font-medium py-2 px-4 rounded-lg shadow-md transition duration-200">
                            <FaInfoCircle className="mr-2 text-gray-600 dark:text-gray-400" />
                            View Club Details
                        </button>
                    )
                ) : (
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
                        {!isClubDetailPage && (
                            <button onClick={handleViewDetail} className="flex items-center bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 text-sm font-medium py-2 px-4 rounded-lg shadow-md transition duration-200">
                                <FaInfoCircle className="mr-2 text-gray-600 dark:text-gray-400" />
                                View Club Details
                            </button>
                        )}
                    </>
                )}
            </div>

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
