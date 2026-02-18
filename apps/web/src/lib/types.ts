export interface SimilarProject {
  address: string;
  council: string;
  DA_outcome: string;
  key_conditions: string[];
  similarity_score: number;
}

export interface DA {
  id: string;
  address: string;
  council: string;
  zoning: string;
  land_size: string;
  height: string;
  FSR: string;
  DA_outcome: string;
  key_conditions: string[];
  pdf_links: string[];
}

export interface DADetail extends DA {
  similar_projects: SimilarProject[];
  approval_score: number;
}

export interface DAListResponse {
  total: number;
  results: DA[];
}

export interface CouncilInfo {
  name: string;
  total_das: number;
  approved: number;
  refused: number;
  deferred: number;
  under_assessment: number;
  approval_rate: number;
}

export interface StatsResponse {
  total_das: number;
  overall_approval_rate: number;
  councils: CouncilInfo[];
}
