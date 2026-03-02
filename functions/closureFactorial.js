// Create a cache system that memoize results
function createFactorialCache(factorialFormula) {
  // calculateOrReturn references this, JS keeps it in memory
  let cache = {}

  return function calculateOrReturn(num) {
    // If it was already calculated and cached, return it
    if (cache[num]) {
      console.log(`El resultado de ${num} es ${cache[num]}`)
      return cache[num];
    }
    // Otherwise, calculate
    cache[num] = factorialFormula(num);
    console.log(`Calculating factorial of ${num} = ${cache[num]}`)
    return cache[num];
  }
}

let factorialCache = createFactorialCache(
  // Function to calculate factorial
  (n) => n <= 1 ? 1 : n * factorialCache(n - 1)
);

factorialCache(5); // La primera iteracion calcula los factoriales del  1 al 5 y los guarda en caché.
factorialCache(5); // La segunda iteracion accede directamente al cache de 5
factorialCache(4); // Dado que la primera iteracion calculó del 1 al 4, también fue guardado el resultado del factorial de 4.