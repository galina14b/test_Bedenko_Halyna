// Завдання №1 =================================

// function deepEqual(objA, objB) {

//   // Перетворюємо обєкти у масиви з ключами об"єктів, без їх значень

//   const keysA = Object.keys(objA);
//   const keysB = Object.keys(objB);

//   // Перевіряємо чи однакова довжина масивів, якщо ні - одразу визначаємо, що об"єкти не є однаковими,
//   // а отже далі перевіряти непотрібно
  
//   if (keysA.length !== keysB.length) {
//     return false;
//   }

//   // перебираємо ключі одного з масивів

//   for (const key of keysA) {
//     // створюємо змінні, в які кладемо значення ключів, які перевіряємо
//     const valA = objA[key];
//     const valB = objB[key];

//     // визначаємо чи є вкладені об"єкти
//     const areObjects = isObject(valA) && isObject(valB);
//     if (
//       // якщо значення ключів є об"єктами - викликаємо функцію для їх порівняння;
//       // в умові прописуємо, що відмінність є
//       areObjects && !deepEqual(valA, valB) ||
//       // якщо значення ключів не є об"єктами - просто порівнюємо їх між собою
//       // в умові прописуємо, що відмінність є
//       !areObjects && valA !== valB
//     ) {
//       // повертаємо false, якщо якась з умов дійсна
//       return false;
//     }
//   }
//   // якщо жодна з умов не підійшла - перевірені об"єкти однакові
//   return true;
// }

// function isObject(object) {
//   // перевіряємо тип переданого аргументу
//   return object != null && typeof object === 'object';
// }

// console.log(deepEqual({name: 'test'}, {name: 'test'})) // output true
// console.log(deepEqual({name: 'test'}, {name: 'test1'})) // output false
// console.log(deepEqual({name: 'test', data: {value: 1}}, {name: 'test', data: {value: 2}})) // output false
// console.log(deepEqual({ name: 'test' }, { name: 'test', age: 10 })) // false




// Завдання №2 =================================

// function* chunkArray(array, count) {
  
//   const arrLength = array.length;
//   // робимо цикл, який триватиме, поки не закінчиться довжина масиву
//   for (let i = 0; i < arrLength; i += count) {
//     // збільшуємо наступний крок на передану аргументом величину
//     yield array.slice(i, count+i)
//   }
// }

// const iterator = chunkArray([1,2,3,4,5,6,7,8], 3);
// console.log(iterator.next()) // { value: [1,2,3], done: false }
// console.log(iterator.next()) // { value: [4,5,6], done: false }
// console.log(iterator.next()) // { value: [7,8], done: false }
// console.log(iterator.next()) // { value: undefined, done: true }




// Завдання №3 =================================

// function bulkRun(array) {
// 	// перебираємо масив та викликаємо кожну функцію масиву
// 	let promises = array.map(item => item[0](...item[1]));
// 	// повертаємо масив значень всіх промисів
//   return Promise.all(promises);
// }

// // const f1 = (cb) => {cb(1)}
// // const f2 = (a, cb) => {cb(a)}
// // const f3 = (a, b, cb) => {setTimeout(() => cb([a, b]), 1000)}

// // я не зрозуміла що таке "cb", ця функція ніде не оголошена, тому видає помилку.
// // За логікою схоже, що вона просто повертає переданий аргумент, тому дозволила собі переписати ці три функції:

// const f1 = () => 1;
// const f2 = (a) => a;
// const f3 = (a, b) => new Promise(resolve => { setTimeout(resolve, 1000, [a, b]) });
// // в функції f3 дописала промис, оскільки функції-обгортці bulkRun треба "дочекатись" результату
// // виконання цієї функції

// bulkRun(
//   [
//     [f1, []],
//     [f2, [2]],
//     [f3, [3, 4]]
//   ]
// ).then(console.log)
//  // Output: [1, 2, [3, 4]]




// Завдання №4 =================================

// function arrayToObject(array) {
  
//   [...array].forEach((item) => {

//     item.map(value => {
//       // перевіряємо чи є в масиві вкладений масив

//       if (Array.isArray(value)) {

//         // якщо є - визначаємо його індекс, "вирізаємо",
//         // та "вставляємо" результат виклику функції,
//         // яка перетворює масив у об"єкт
//         let index = item.indexOf(value);
//         item.splice(index, 1, arrayToObject(value))
//       }
//     })
//   });
 
//   // перетворюємо пару масив у об"єкт
//   return Object.fromEntries(array);
   
// }

// var arr = [['name', 'developer'], ['age', 5], ['skills', [['html',4], ['css', 5], ['js',5]]]];

// console.log(arrayToObject(arr));
// Outputs: {
	// name: 'developer',
	// age: 5,
	// skills: {
	// 	html: 4,
	// 	css: 5,
	// 	js: 5
	// }




// Завдання №5 =================================

// function objectToArray(obj) {

//   for (let key in obj) {
//     // Перевіряємо чи є вкладені об"єкти
//     if (typeof obj[key] === "object" && typeof obj[key] !== 'null') {
//       // перетворюємо значення ключа на масив
//       obj[key] = objectToArray(obj[key])
//     }
//   }

//   return Object.entries(obj)
// }

// console.log(objectToArray({
// 	name: 'developer',
// 	age: 5,
// 	skills: {
// 		html: 4,
// 		css: 5,
// 		js: 5
// 	}
// }))

// Outputs: [['name', 'developer'], ['age', 5], ['skills', [['html', 4], ['css', 5], ['js', 5]]]




// Завдання №6 =================================

// function NotificationException() {}
// function ErrorException() {}

// function primitiveMultiply(a, b) {
//   const rand = Math.random();
//   if (rand < 0.5) {
//     return a * b;
//   } else if(rand > 0.85) {
//     throw new ErrorException()
//   } else {
//     throw new NotificationException()
//   }
// }

// function reliableMultiply(a, b) {
// 	try {
			// викликаємо функцію
// 		return primitiveMultiply(a, b)
// 	}

// 	catch (error) {
// 		console.log(error)

			// Якщо видало помилку - перевіряємо яка саме помилка
// 		if (error.constructor.name === 'NotificationException') {
// 			return primitiveMultiply(a, b);
// 		}

			// якщо помилка не результат виклику "NotificationException" - припиняємо виконання функції
// 		return 'wow, error';
// 	}
// }

// console.log(reliableMultiply(8, 8));




// Завдання №7 ================================

// const obj = {
//   a: {
//     b: {
//       c: 12,
//       d: 'Hello World'
//     },
//     e: [1,2,3]
//   }
// };

// function mapObject(data) {
// 	let result = {};
//   step(data, []);

// 	function step(part, keys) {
// 		// Беремо ключі об"єкту та перебираємо їх
// 		Object.keys(part).forEach(function (key) {

// 			// Перевірямо чи є значення ключа об"єктом
// 			if (part[key] !== null && !Array.isArray(part[key]) && typeof part[key] === 'object') {
// 				// якщо так - запускаємо функцію, щоб "розібрати" вкладений об"єкт, передаємо
// 				// в якості аргументів значення ключа, який виявився об"єктом та масив з "ланцюжком" ключів
//         return step(part[key], keys.concat(key));
// 			}
			
// 			// в кінцевий об"єкт додаємо "ланцюжок" ключів та їх значення
//       result[keys.concat(key).join('/')] = part[key];
//     });
//   }

//   return result;
// }

// console.log(mapObject(obj));
// Outputs: {
//   'a/b/c': 12,
//   'a/b/d': 'Hello World',
//   'a/e': [1,2,3]
// }




// Завдання №8 =================================

// function combos(n) {

// 	let result = [];
// 	let combo = [];

// 	// перший масив зробимо тільки з "1"
// 	for (let i = 0; i < n; ++i) combo.push(1);

// 	// слідкуємо, щоб цикл продовжувався, доки не досягнемо заданого числа
// 	while (combo[0] != n) {

// 		// "копію" проміжних результатів записуємо у кінцевий масив
// 		result.push(combo.slice(0));

// 		//
// 		let min = combo[0];
//    let minindex = 0;
//    let sum = combo[0];
// 		let comboSum = combo[0];
		
// 		for (let j = 1; j < combo.length - 1; ++j) {
// 			comboSum += combo[j];
			
//       if (min > combo[j]) {
//         min = combo[j];
//         minindex = j;
//         sum = comboSum;
//       }
// 		}
		
// 		// Збільшуємо перше число наступного масиву на одиницю
//     combo[minindex] += 1;
//     sum += 1;
// 		combo.splice(minindex + 1);
		
// 		// Залишок масиву "заповнюємо" одиницею, доки загальна сума масиву не дійде до заданого числа
//     for (let k = 0; k < n - sum; ++k) combo.push(1);
// 	}
	
// 	result.push([n]);

// 	return result;
// }

// console.log(combos(5));
// Output:
// [
//   [ 3 ],
//   [ 1, 1, 1 ],
//   [ 1, 2 ]
// ]

// combos(10);
// Output:
// [
//   [ 10 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 1, 2 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 3 ],
//   [ 1, 1, 1, 1, 1, 1, 4 ],
//   [ 1, 1, 1, 1, 1, 5 ],
//   [ 1, 1, 1, 1, 6 ],
//   [ 1, 1, 1, 7 ],
//   [ 1, 1, 8 ],
//   [ 1, 9 ],
//   [ 1, 1, 1, 1, 1, 1, 2, 2 ],
//   [ 1, 1, 1, 1, 1, 2, 3 ],
//   [ 1, 1, 1, 1, 2, 4 ],
//   [ 1, 1, 1, 1, 2, 2, 2 ],
//   [ 1, 1, 1, 1, 3, 3 ],
//   [ 1, 1, 1, 2, 5 ],
//   [ 1, 1, 1, 2, 2, 3 ],
//   [ 1, 1, 1, 3, 4 ],
//   [ 1, 1, 2, 6 ],
//   [ 1, 1, 2, 2, 4 ],
//   [ 1, 1, 2, 2, 2, 2 ],
//   [ 1, 1, 2, 3, 3 ],
//   [ 1, 1, 3, 5 ],
//   [ 1, 1, 4, 4 ],
//   [ 1, 2, 7 ],
//   [ 1, 2, 2, 5 ],
//   [ 1, 2, 2, 2, 3 ],
//   [ 1, 2, 3, 4 ],
//   [ 1, 3, 6 ],
//   [ 1, 3, 3, 3 ],
//   [ 1, 4, 5 ],
//   [ 2, 8 ],
//   [ 2, 2, 6 ],
//   [ 2, 2, 2, 4 ],
//   [ 2, 2, 2, 2, 2 ],
//   [ 2, 2, 3, 3 ],
//   [ 2, 3, 5 ],
//   [ 2, 4, 4 ],
//   [ 3, 7 ],
//   [ 3, 3, 4 ],
//   [ 4, 6 ],
//   [ 5, 5 ]
// ]




// Завдання №9 =================================

// function add (a) {
// 	let sum = a;

// 	// рахуємо суму перших двох аргументів
// 	const func = (b) => {
//     sum += b;
//     return func;
// 	};
	
// 	// перезаписуємо проміжний результат
// 	func.toString = () => sum; 

// 	// додаємо до нової суми наступний аргумент
//   return func;
// };


// console.log(Number(add(1)(2))); // == 3
// console.log(Number(add(1)(2)(5))); // == 8
// console.log(Number(add(1)(2)(-3)(4))); //  == 4
// console.log(Number(add(1)(2)(3)(4)(-5))); // == 5


