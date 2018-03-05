export interface PatiensEditModel {
    id: number;
    name: string;
    lastName: string;
    identificationNumber: string;
    consultationReason: string;
    diagnosticId?: number;
    birthDate: Date;
    origin: string;
    contactPhones: string;
    email: string;
    socialSecurityId?: number;
    prerinatologicalBackground: string;
    epidemiologicalBackground: string;
    physiologicalBackground: string;
    pathologicalBackground: string;
    familyBackground: string;
}
