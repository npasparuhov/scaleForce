# scaleForce
Code challenge from ScaleForce


## Requirements
1. Create a basic React.js/Typescript application using a backend API provided by
API1. All countries

GET
`https://restcountries.eu/rest/v2/all`

API2. Search by name:
GET
`https://restcontries.eu/rest/v2/name/:nameOfCountry`

More info about the API: https://restcountries.eu/

2. Present in a responsive grid view (table) the results of API1. Provide filter on name, sorting of columns and paging;

3. Implement details view with the same fields present in the table. Show that details view when the user presses and holds left mouse button over table’s row for several seconds. Implement some form of small countdown (or progress) indicator so that the user can see how long he should keep pressing until the details view is shown.

4. Implement an autocomplete filter box for the countries using API2 (on each symbol entered in the filter box a suggestions dropdown with up to 10 items is displayed);

When a country is selected show more information about it using the API2 results.

5. Try to architecture your solution using best practices – separation of concerns, SOLID principles, DRY etc.

6. Publish your solution in github and send a link.
