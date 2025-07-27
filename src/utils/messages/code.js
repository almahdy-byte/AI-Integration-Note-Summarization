import { customAlphabet } from "nanoid"

export const code =()=>{
    const OTP = customAlphabet('0123456789' , 6);
    return OTP();
}
