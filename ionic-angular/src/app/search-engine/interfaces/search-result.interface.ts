export interface PathFromRoot {
    id: string;
    name: string;
    score?: number; // Opcional, ya que no todos los objetos lo incluyen
}

export interface CategoryFromRoot {
    path_from_root: PathFromRoot[];
    score: number;
}

export interface Category {
    id: number;
    name: string;
    path_from_root: PathFromRoot[];
    parent: string | null;
    score: number;
}

export interface Categories {
    categorie: Category[];
}

export interface CategoryResponse {
    categories_from_root: CategoryFromRoot[];
    categories: Categories[];
}
