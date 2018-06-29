export interface NamedModel {
    id: number;
    name: string;
}

export interface CompGridModel {
    id: number;
    name: string;
    cells: CompCellModel[];
}

export interface CompCellModel {
    complementId: number;
    value: number;
}

export interface ComplementModel {
    id: number;
    date: string;
    consultationId: number;
    complementaryMethods: ComplementaryMethodInstanceModel[];
    laboratoryModels: LaboratoryInstanceModel[];
}

export interface ComplementaryMethodInstanceModel {
    id: number;
    complementaryMethodId: number;
    value: number;
}

export interface LaboratoryInstanceModel {
    id: number;
    laboratoryId: number;
    value: number;
}
