export interface Page {
  id: string;
  name: string;
  path: string;
  content: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

export interface GeneratedSite {
  id: string;
  name: string;
  type: string;
  theme: string;
  pages: Page[];
  colors: ColorScheme;
  prompt: string;
  createdAt: string;
}
