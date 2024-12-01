import { UserAddressModel } from "./userAdressModel"
import { UserCompanyModel } from "./userCompanyModel"

export interface UserSearchOutputModel {
    id: number,
    name: string,
    username: string,
    email: string,
    address: UserAddressModel,
    phone: string,
    website: string,
    company: UserCompanyModel
}