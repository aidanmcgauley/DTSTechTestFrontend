export interface Task {
  title: string;
  description?: string;
  status: number;
  dueDateTime: string; // ISO string
}
