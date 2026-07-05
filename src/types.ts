/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  STUDENT = 'student',
  STAFF = 'staff'
}

export interface User {
  id: string;
  regNo: string;
  name: string;
  email: string;
  role: UserRole;
  program: string;
  department: string;
  admissionYear: string;
  currentSemester: string;
  gpa: number;
  avatarUrl?: string;
  bio?: string;
}

export interface AcademicModule {
  id: string;
  code: string;
  title: string;
  credits: number;
  instructor: string;
  description: string;
  syllabus: string[];
  progress: number;
  schedule: string;
  materialsCount: number;
}

export interface AcademicResult {
  id: string;
  moduleCode: string;
  moduleTitle: string;
  credits: number;
  grade: string;
  points: number;
  semester: string;
}

export interface BillItem {
  id: string;
  description: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export interface BillingStatement {
  totalInvoiced: number;
  totalPaid: number;
  balanceDue: number;
  items: BillItem[];
  paymentsHistory: {
    id: string;
    date: string;
    amount: number;
    reference: string;
    method: string;
  }[];
}

export interface AdmissionApplication {
  id: string;
  fullName: string;
  email: string;
  programChoice: string;
  academicBackground: string;
  statementOfFaith: string;
  status: 'draft' | 'submitted' | 'under_review' | 'offered' | 'accepted' | 'declined';
  offerLetter?: string;
  submissionDate?: string;
}

export interface AccommodationType {
  id: string;
  name: string;
  capacity: number;
  occupied: number;
  pricePerSemester: number;
  description: string;
  amenities: string[];
}

export interface AccommodationApplication {
  id: string;
  hostelId: string;
  roomNo?: string;
  status: 'none' | 'pending' | 'allocated' | 'rejected';
  appliedDate?: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
  coverColor: string;
  available: boolean;
  isbn: string;
  summary: string;
  pages: number;
  chapters: { title: string; pages: string }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
