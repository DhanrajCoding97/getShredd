export type SignupDataProps = {
    email: string;
    password: string;
};

export type SignUpResponse = {
    success: boolean;
    message: string;
    user: {
        id: string;
        email: string | null;
    } | null;
};
export type SignInResponse = {
    success: boolean;
    message: string;
    user: {
        id: string;
    } | null;
};
