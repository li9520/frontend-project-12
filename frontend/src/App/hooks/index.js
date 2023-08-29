import { useContext } from 'react';

import { AuthContext, SocketContext } from '../../contexts';

const useAuth = () => useContext(AuthContext);
const useSocket = () => useContext(SocketContext);

export { useAuth, useSocket };
