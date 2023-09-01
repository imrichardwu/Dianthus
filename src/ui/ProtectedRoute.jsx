import {styled} from "styled-components";
import {useUser} from "../features/authentication/useUser";
import Spinner from "./Spinner";
import AppLayout from "./AppLayout";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var() (--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({children}) {
    const {isLoading, isAuthenticated} = useUser();
    const navigate = useNavigate();

    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate("/login");
        },
        [isAuthenticated, isLoading, navigate]
    );

    if (isLoading)
        return (
            <FullPage>
                <AppLayout />
            </FullPage>
        );

    if (isAuthenticated) return children;
}

export default ProtectedRoute;
