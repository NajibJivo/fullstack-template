//Point frontend to backend
const API_URL = "http://localhost:8080/api/users";
//console.clear();

(async function test(){
  try {
    console.log("Fetching:", API_URL);
    const res = await fetch(API_URL);
    console.log("Status:", res.status, res.statusText);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    console.log("FE ↔ BE OK:", data, "antal:", data.length);
  } catch (err) {
    console.error("FE ↔ BE ERROR:", err);
  }
})();


console.log('=== Array Methods ===')

// #1. MAP - double numbers
const numbers1 = [1, 2, 3, 4, 5];

const doubled = numbers1.map(n => n * 2);
console.log('#1 - double numbers:', doubled)

// #2. MAP - objects to names
const users2 = [
    {name: 'Alice', age:30 }, 
    {name: 'Bob', age:25 }, 
    {name: 'Eve', age:22 }, 
];

const userNames = users2.map(user => user.name);
console.log('#2 - userNames', userNames);

const numbers = [1, 2, 3, 4, 5, 6];

// #3. Filter - even numbers (lige tal)
const numbers3 = [1,2,3,4,5,6];
 
const evens = numbers3.filter(n =>  n % 2 === 0);
console.log('#3 - evens:', evens);


//#4. Filter – users age ≥ 18
const users4 = [
    {name: 'Alice' , age: 30},
    {name: 'Bob' , age: 17}, 
    {name: 'Eve' , age: 22}
];

const adults = users4.filter(user => user.age >= 18)
console.log("#4 - adults:", adults);


// #5. Reduce with numbers
const numbers5 = [5, 10, 15];

const sum = numbers5.reduce((acc, cur) => acc + cur, 0);
console.log('#5 - sum:', sum)

// #6. Reduce with objects
const users6 = [
    {name: 'Alice' , age: 30},
    {name: 'Bob' , age: 25}, 
    {name: 'Eve' , age: 22}
];

const totalAge = users6.reduce((acc, cur) => acc + cur.age, 0);
console.log('#6 - totalAge:', totalAge);

// #7. Find
const workers = [
    { name: "John", age: 28 },
    { name: "Jane", age: 32 },
    { name: "Jim", age: 25 }
];

const firstOver30 = workers.find(worker => worker.age > 30);
console.log('#7 - firstOver30:', firstOver30)


// #8. Some & Every
/*Given an array of ages, use .some() to check if any age is over 18,
 and .every() to check if all ages are over 18. 
 Print the results to the console. */

const ages = [16, 21, 18, 19];

const anyOver18 = ages.some(age => age > 18);
const allOver18 = ages.every(age => age > 18);
console.log('#8 - anyOver18:', anyOver18, 'allOver18:', allOver18)

// #9. Sorting - numbers  (asc/desc)
const numbers9 = [10, 2, 33, 4];

/*Navngivne compare-funktioner er bedst hvis du vil genbruge, 
teste, eller give dem et meningsfuldt navn (fx byNumberAsc, byNumberDesc). 
Det øger læsbarhed og gør refaktorering nemmere. */

const ascCmp = (a,b) => a - b;
const decCmp = (a,b) => b - a;


const ascNums  = [...numbers9].sort(ascCmp);
const descNums = [...numbers9].sort(decCmp);
console.log('#9 - asc:',ascNums, 'desc:', descNums);



// #10. Sorting arrays of strings
const carBrands = ["Toyota", "BMW", "Audi", "Mercedes"];

const ascStr  = (a,b) => a.localeCompare(b);
const desStr  = (a,b) => b.localeCompare(a);

const ascBrands = [...carBrands].sort(ascStr);
const descBrands = [...carBrands].sort(desStr);

console.log('#10) a-z:', ascBrands, 'z-a:', descBrands);



// #11. Sorting objects
const users = [
	{ name: "Bob", age: 25 },
	{ name: "Alice", age: 30 },
	{ name: "Eve", age: 22 }
];

const ascUsr   = (a,b) => a.age - b.age;
const descUsr = (a,b) => b.age - a.age;

const byAgeAsc  = [...users].sort(ascUsr);
const byAgeDesc = [...users].sort(descUsr);

console.log('#11 - byAgeAsc:', byAgeAsc, 'byAgeDesc:', byAgeDesc);

// #12. Sorting objects by any key
function compareByKey(key, ascending = true) {
    return (a, b) => {
         // 1) Slå værdierne op dynamisk ud fra nøglen
        const valA = a[key];
        const valB = b[key];

    // 2) Talhåndtering: returnér et negativt/positivt/0 tal
        if (typeof valA === 'number' && typeof valB === 'number') {
            // 
            return ascending ? valA - valB : valB - valA;
            
        }
            // 3) Stringhåndtering: korrekt a–å sortering (cast til String for sikkerhed)
        return ascending ? String(valA).localeCompare(String(valB))
                         : String(valB).localeCompare(String(valA));
    };
}

// Testdata: lille dataset til at afprøve både navn (string) og alder (number)
const users12 = [
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Eve", age: 22 }
];

// byNameAscending: sorter users alfabetisk stigende efter 'name'
const byNameAscending = [...users12].sort(compareByKey('name', true));

// byAgeDescending: sorter users numerisk faldende efter 'age'
const byAgeDescending = [...users12].sort(compareByKey('age', false));

// Print til konsollen.
console.log('#12 - byNameAsc:', byNameAscending, 'byAgeDesc:', byAgeDescending);


/* #13. Chaining array methods */
const numbers13 = [1, 2, 3, 4, 5];

const oddSquares = numbers13
.filter(n => n % 2 === 1)
.map( n => n * n);

console.log('#13 - oddSquares:', oddSquares);  // [1, 9, 25]