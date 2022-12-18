export interface Data extends Array<Data> {
    id: number;
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
}
