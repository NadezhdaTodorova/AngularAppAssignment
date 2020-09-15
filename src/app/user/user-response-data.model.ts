export class UserResponseData{
    constructor(
        public kind: string,
        public idToken: string,
        public email: string,
        public refreshToken: string,
        public expiresIn: string,
        public localId: string,
        public registered?: boolean
    ){}
}