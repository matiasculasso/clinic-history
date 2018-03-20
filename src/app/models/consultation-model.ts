export interface Consultation {
    id: number;
    date: Date;
    evolution: string;
    physician: string;
    patientId: number;
    complementaryMethodRequested: boolean;
    alimentation?: string;
    comments?: string;
    defecatoryHabit?: string;
    length?: number;
    physicalActivity?: string;
    physicalExam?: string;
    schoolPerformance?: string;
    weight?: number;
}
