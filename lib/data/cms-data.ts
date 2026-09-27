import { PORTFOLIO_DATA, BLOG_DATA, PortfolioItem, BlogItem } from "./mock-data";

export { type PortfolioItem, type BlogItem };

export const PORTFOLIO_STORAGE_KEY = "velocity_portfolio_data";
export const BLOG_STORAGE_KEY = "velocity_blog_data";

export function getStoredPortfolio(): PortfolioItem[] {
  if (typeof window === "undefined") return PORTFOLIO_DATA;
  try {
    const saved = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading portfolio data from localStorage", e);
  }
  return PORTFOLIO_DATA;
}

export function savePortfolio(items: PortfolioItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("portfolio-updated"));
  } catch (e) {
    console.error("Error saving portfolio data to localStorage", e);
  }
}

export function getStoredBlogPosts(): BlogItem[] {
  if (typeof window === "undefined") return BLOG_DATA;
  try {
    const saved = localStorage.getItem(BLOG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading blog data from localStorage", e);
  }
  return BLOG_DATA;
}

export function saveBlogPosts(items: BlogItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("blog-updated"));
  } catch (e) {
    console.error("Error saving blog data to localStorage", e);
  }
}
