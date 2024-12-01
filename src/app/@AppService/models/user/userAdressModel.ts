import { UserAdressGeoModel } from "./userAdressGeoModel";

export interface UserAddressModel {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: UserAdressGeoModel;
}