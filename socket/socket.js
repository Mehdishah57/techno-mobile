import { io } from "socket.io-client";
import {REACT_APP_BACKEND} from "@env";

const socket = io(`${REACT_APP_BACKEND}`);

export default socket;