export enum TipoAlimento {
    CASEIRO = 1,
    INDUSTRIALIZADO,
    PERECIVEL,
    NAOPERECIVEL,
    INNATURA
}

export enum TipoArmazenamento {
    LOCALSECO = 1,
    PRONTOCONSUMO,
    REFRIGERACAO,
    CONGELAMENTO
}

export enum StatusDoacao {
    DISPONIVEL = "DISPONIVEL",
    ANDAMENTO = "ANDAMENTO",
    CONCLUIDA = "CONCLUIDA",
    CANCELADA = "CANCELADA"
}

export enum UnidadeMedida {
    ML = 1,
    G,
    L,
    KG
}