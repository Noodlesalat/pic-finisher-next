export interface ExplorerImageGroup {
  id: string;
  dateTime: string;
  prompt: string;
  originalUrl?: string;
  aiUrl?: string;
}

export interface PrintData {
  originalUrl: string;
  aiUrl: string;
  prompt: string;
  dateTime: string;
}
