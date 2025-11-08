/* 
Event Delegation

 Create an event delegation pattern for a list of items.
*/

document.getElementById('list').addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        console.log(`Item clicked: ${event.target.textContent}`);
    }
});

{/* 
<ul id="list">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul> 
*/}