export enum StatusEmpresa {
    ATIVA = 1,
    SUSPENSA,
    INATIVA
}

export enum TipoEmpresa {
    DOADORA = 1,
    RECEBEDORA
}

export enum CategoriaEstabelecimento {
    RESTAURANTE = 1,
    HORTIFRUTTI,
    MERCADO,
    PADARIA,
    FASTFOOD,
    ADEGA
}

export enum CategoriaInstituicao {
    ONG = 1,
    OSC,
    RELIGIOSA,
    BANCODEALIMENTOS
}

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