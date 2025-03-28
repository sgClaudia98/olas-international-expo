interface Address {
    line1: string,
    line2: string,
    city: string,
    state: string,
    zipCode: string,
    countryRegion: string
}

interface Country {
    id: number,
    code: string,
    name: string
}

export interface Client {
    id: number,
    email: string,
    fullName: string,
    phone?: string,
    active: boolean,
    address: Address,
    idDocument: string,
    firstName: string,
    lastName: string,
    secondFirstName: string,
    secondLastName: string,
    passport: string,
    passportExpiration: Date,
    passportEvidenceId: number,
    birthdate: Date,
    debitCardNumber: string,
    country: Country
}