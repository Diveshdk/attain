export interface CourseOutcome {
  id: string;
  description: string;
  mappingLevels: {
    [key: string]: number; // PO1, PO2, etc. -> mapping level (1, 2, or 3)
  };
}

export interface StudentScore {
  id: string;
  coId: string;
  score: number;
  maxScore: number;
}

export interface AttainmentLevel {
  coId: string;
  poId: string;
  level: number;
  percentage: number;
}

export interface AnalyticsData {
  courseOutcomes: CourseOutcome[];
  studentScores: StudentScore[];
  attainmentLevels: AttainmentLevel[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  threshold2: number;
  threshold3: number;
  studentCount: number;
  assessmentTypes: AssessmentType[];
}

export interface AssessmentType {
  name: string;
  weightage: number;
}

export interface StudentCOScore {
  rollNumber: string;
  scores: {
    [key: string]: {
      score: number;
      outOf: number;
    };
  };
}