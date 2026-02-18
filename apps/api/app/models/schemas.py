from pydantic import BaseModel


class SimilarProject(BaseModel):
    address: str
    council: str
    DA_outcome: str
    key_conditions: list[str]
    similarity_score: float


class DABase(BaseModel):
    id: str
    address: str
    council: str
    zoning: str
    land_size: str
    height: str
    FSR: str
    DA_outcome: str
    key_conditions: list[str]
    pdf_links: list[str]


class DADetail(DABase):
    similar_projects: list[SimilarProject]
    approval_score: int


class DAListResponse(BaseModel):
    total: int
    results: list[DABase]


class CouncilInfo(BaseModel):
    name: str
    total_das: int
    approved: int
    refused: int
    deferred: int
    under_assessment: int
    approval_rate: float


class StatsResponse(BaseModel):
    total_das: int
    overall_approval_rate: float
    councils: list[CouncilInfo]
