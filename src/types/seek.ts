export interface Seek {
  id: string;
  name: string;
  email: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

export interface SeekFormData {
  name: string;
  email: string;
  content: string;
  tags: string[];
} 