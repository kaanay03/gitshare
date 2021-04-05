export const statusChangeMutation = `
    mutation ($status: ChangeUserStatusInput!) {
        changeUserStatus(input: $status) {
            status {
                emoji
                message
            }
        }
    }
`;
