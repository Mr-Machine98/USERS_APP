export function usersReducer(state = [], action) {
    switch (action.type) {
        case 'addUser':
            return [
                ...state,
                {
                    ...action.payload,
                    id: Math.floor(Math.random() * 1000) + 1
                }
            ];
        case 'updateUser':
            return state.map( u => {
                if (u.id == action.payload.id) return {
                    ...action.payload
                };
                return u;
            });
        case 'removeUser':
            return state.filter(user => user.id !== action.payload);

        default:
            return state;
    }
}