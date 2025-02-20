/** 
 * @author Pihedy
 */

/**
 * Counts the number of elements in the provided object.
 * 
 * @param object - The object to count the elements of.
 * 
 * @returns The number of elements in the provided object.
 */
export function count(object: any): number {
    if (Array.isArray(object)) {
        return object.length;
    }

    return count(Object.keys(object));
}
