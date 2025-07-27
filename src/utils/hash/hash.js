import bcrypt from "bcrypt";

export const Hash = {
    hash:(data)=> bcrypt.hashSync(data , Number(process.env.HASH_SALT_ROUNDS) ) ,
    compare:(data , hashedData) => bcrypt.compareSync(data , hashedData)
}