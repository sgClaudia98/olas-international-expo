
  
  export interface PaginationRequest {
    offset?: number;
    limit?: number;
  }

  export interface PaginationResponse {
    totals: number ;
    offset: number ;
    limit: number;
  }
