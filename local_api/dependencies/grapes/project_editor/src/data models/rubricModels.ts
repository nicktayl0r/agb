
// export interface JsonEditorRubric {
//      resource_activity_rubric_type:any;
//      trackL: boolean;
//      trackH: boolean;
//      trackAP: boolean;
//      trackA: boolean;
//      trackE: boolean;
//      trackEX: boolean;
//      trackM: boolean;
//      trackMX: boolean;
//      key: string;
//      brief: string;
//      question:string;
//      resource_activity_rubric_skills: any;
//      autograde:boolean;
//      resource_activity_rubric_answers:any;
//      exemplar_answer:string;
//      rubrique:string;
//      resource_activity_rubric_screenshots: any;
//}

export interface JsonEditorRubricsObject {
    //rubrics: JsonEditorRubric[];
    rubrics: any;
}

export interface ConvertedRubrics {
    caseES: SableRubric[];
    handbookES: SableRubric[];
    caseMS: SableRubric[];
    handbookMS: SableRubric[];
    caseHS: SableRubric[];
    handbookHS: SableRubric[];
    caseAP: SableRubric[];
    handbookAP: SableRubric[];
}

export interface SableRubric {
    autograde: boolean;
    brief: string;
    exemplar_answer: string;
    key: string;
    order: number;
    question: string;
    resource_activity_rubric_answers: Answer[];
    resource_activity_rubric_skills: Skill[];
    resource_activity_rubric_type: string;
    resource_activity_id: number;
    resource_id: number;
    rubrique: string;
    resource_activity_rubric_screenshots: Screenshot[];
}

export interface Answer {
    answer: string;
    points: number;
}

export interface Skill {
    resource_activity_skill:
    | "Short Answer"
    | "Long Answer"
    | "Multiple Choice"
    | "Repeat Attempts"
    | "Integer"
    | "Fraction"
    | "Image";
}

export interface Screenshot {
    url: string;
    caption: string;
    order: number;
}
