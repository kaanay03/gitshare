export interface StatusResponse{
    changeUserStatus: ChangeUserStatus
}

interface ChangeUserStatus{
    status: UserStatus
}

interface UserStatus{
    emoji: string,
    message: string
}