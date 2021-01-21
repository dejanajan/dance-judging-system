export interface Competition {
    event_id: number;
    event_name: string;
}

export interface DanceStyle {
    dance_style_id: number;
    dance_style_name: string;
}

export interface DanceCategory {
    category_id: number;
    category_name: string;
}

export interface AgeGroup {
    age_group_id: number;
    age_group_name: string;
}

export interface Dance {
    dance_id: number;
    dance_name: string;
    dance_shortname: string;
}

export interface Round {
    round_id: number;
    round_name: string;
}

export interface Judge {
    judge_id: number;
    judge_name: string;
}

export interface Component {
    component_id: number;
    component_name: string;
    component_shortname: string;
}