/* 
Simple Pagination Function

Write a function that paginates an array.
*/

function paginate(array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
// Usage
const items = Array.from({ length: 50 }, (_, i) => i + 1);
const page = paginate(items, 10, 2);
console.log(page); // [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]