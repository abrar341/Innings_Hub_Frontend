import { useDispatch, useSelector } from "react-redux";
import { showLoginDialog, showSignupDialog, showVerifyDialog, hideLoginDialog, hideSignupDialog, hideVerifyDialog } from "../slices/dialogbox/dialogSlice";

const useDialog = () => {
    const dispatch = useDispatch();
    const isVerifyDialogOpen = useSelector((state) => state.dialog.isVerifyDialogOpen);
    const isSignupDialogOpen = useSelector((state) => state.dialog.isSignupDialogOpen);
    const isLoginDialogOpen = useSelector((state) => state.dialog.isLoginDialogOpen);

    const showVerifyDialog = () => {
        dispatch(showVerifyDialog());
    };

    const closeVerifyDialog = () => {
        dispatch(hideVerifyDialog());
    };
    const showLoginDialog = () => {
        dispatch(showLoginDialog());
    };
    const closeLoginDialog = () => {
        dispatch(hideLoginDialog());
    };
    const showSignupDialog = () => {
        dispatch(showSignupDialog());
    };
    const closeSignupDialog = () => {
        dispatch(hideSignupDialog());
    };

    return {
        isVerifyDialogOpen,
        isLoginDialogOpen,
        isSignupDialogOpen,
        showVerifyDialog,
        showLoginDialog,
        showSignupDialog,
        closeVerifyDialog,
        closeLoginDialog,
        closeSignupDialog,
    };
};

export default useDialog;
