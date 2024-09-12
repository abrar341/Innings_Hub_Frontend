import { useDispatch, useSelector } from "react-redux";
import { showLoginDialog, showSignupDialog, showVerifyDialog, hideLoginDialog, hideSignupDialog, hideVerifyDialog } from "../slices/dialogbox/dialogSlice";

const useDialog = () => {
    const dispatch = useDispatch();
    const isVerifyDialogOpen = useSelector((state) => state.dialog.isVerifyDialogOpen);
    const isSignupDialogOpen = useSelector((state) => state.dialog.isSignupDialogOpen);
    const isLoginDialogOpen = useSelector((state) => state.dialog.isLoginDialogOpen);

    const openVerifyDialog = () => {
        dispatch(showVerifyDialog());
    };

    const closeVerifyDialog = () => {
        dispatch(hideVerifyDialog());
    };
    const openLoginDialog = () => {
        dispatch(showLoginDialog());
    };
    const closeLoginDialog = () => {
        dispatch(hideLoginDialog());
    };
    const openSignupDialog = () => {
        dispatch(showSignupDialog());
    };
    const closeSignupDialog = () => {
        dispatch(hideSignupDialog());
    };

    return {
        isVerifyDialogOpen,
        isLoginDialogOpen,
        isSignupDialogOpen,
        openVerifyDialog,
        openLoginDialog,
        openSignupDialog,
        closeVerifyDialog,
        closeLoginDialog,
        closeSignupDialog,
    };
};

export default useDialog;
