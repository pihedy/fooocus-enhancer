/** 
 * @author: Pihedy
 */

/**
 * Converts the given text to a URL-friendly slug.
 * 
 * @param text - The input text to be slugified.
 * 
 * @returns A slugified version of the input text.
 */
export function slugify(text: string): string {
    return text
        .toString()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s-_]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}