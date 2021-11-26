const distance = (x1, y1, x2, y2) => {
    let R = 6378137;
    let dLat = (x2 - x1) * Math.PI / 180;
    let dLng = (y1 - y2) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(x1 * Math.PI / 180) * Math.cos(x2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return Math.round(d);
};
const calculateFitness = (graph, chromosome) => {
    let totalDist = 0;
    for (let i = 0; i < chromosome.path.length - 1; i++) {
        if (graph[chromosome.path[i]] && graph[chromosome.path[i + 1]]) {
            totalDist += distance(graph[chromosome.path[i]]?.lat, graph[chromosome.path[i]]?.lng, graph[chromosome.path[i + 1]]?.lat, graph[chromosome.path[i + 1]]?.lng);
        }
    }
    return totalDist;
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const getInitialGeneration = (n, points, graph) => {
    const population = [];
    for (let i = 0; i < n; i++) {
        const chromosome = {
            path: shuffleArray(Array.from({length: points - 1}, (_, i) => i + 1)),
            fitness: 0,
        };
        chromosome.path.unshift(0);
        chromosome.path.push(0);
        chromosome.fitness = calculateFitness(graph, chromosome);
        population.push({...chromosome});
    }
    return population;
};
//скрещивание
const crossingover = (population, graph) => {
    population = shuffleArray(population);
    const newPopulation = [];
    const l = population.length;
    for (let i = 0; i < l / 2; i++) {
        //берём симметричные хромосомы в родительской популяции
        const p1 = population[i];
        const p2 = population[l - i - 1];
        const chromosomeLength = p1.path.length;
        //новая хромосома
        const childPath = new Array(p1.path.length).fill(-1);
        //создаем радномный массив индексов
        let randomArraySelector = shuffleArray(
            Array.from({length: chromosomeLength - 2}, (_, i) => i + 1)
        );
        //делим его пополам
        randomArraySelector = randomArraySelector.slice(
            randomArraySelector.length / 2
        );

        //сортируем
        randomArraySelector.sort();
        const vis = Array(chromosomeLength).fill(false);
        //заполняем по найденным рандомным индексам новую хромосому из первой родительской
        for (let j = 1; j < randomArraySelector.length; j++) {
            childPath[randomArraySelector[j]] = p1.path[randomArraySelector[j]];
            vis[p1.path[randomArraySelector[j]]] = true;
        }
        //там где не заполнили дополняем второй родительской хромосомой
        let k = 0;
        let j = 0;
        while (j < chromosomeLength - 1) {
            if (childPath[j] === -1) {
                if (!vis[p2.path[k]]) {
                    childPath[j] = p2.path[k];
                    j++;
                    k++;
                } else {
                    k++;
                }
            } else {
                j++;
            }
        }
        //возвращаемся в точку отправки
        childPath[chromosomeLength - 1] = 0;
        //добавили к хромосоме расчет фитнес функциии
        const childChromosome = {path: childPath, fitness: 0};
        childChromosome.fitness = calculateFitness(graph, childChromosome);
        newPopulation.push(childChromosome);
    }

    return newPopulation;
};
//мутация
const mutation = (newPopulation, graph) => {
    const mutatedPopulation = [];
    let l = newPopulation.length;
    //записали популяцию до мутации
    for (let i = 0; i < l; i++) {
        mutatedPopulation.push({path: [...newPopulation[i].path], fitness: 0});
    }
    for (let i = 0; i < l; i++) {
        const chromosomeLength = mutatedPopulation[i].path.length;
        //рассчитываем два рандомных индекса и меняем местами номера пунктов по этим индексам
        const a = Math.floor(Math.random() * (chromosomeLength - 3)) + 1;
        const b = Math.floor(Math.random() * (chromosomeLength - 3)) + 1;
        const temp = mutatedPopulation[i].path[a];
        mutatedPopulation[i].path[a] = mutatedPopulation[i].path[b];
        mutatedPopulation[i].path[b] = temp;
        mutatedPopulation[i].fitness = calculateFitness(
            graph,
            mutatedPopulation[i]
        );
    }
    return mutatedPopulation;
};

const GA = function* (points, graph, generations, initialPopulation) {
    let population = getInitialGeneration(initialPopulation, points, graph);
    for (let gen = 0; gen < generations; gen++) {
        //скрещивание
        const newPopulation = crossingover(population, graph);

        //мутация
        const mutatedPopulation = mutation(newPopulation, graph);
        population = population.concat(mutatedPopulation);

        //отбор
        population.sort((a, b) => {
            if (a.fitness < b.fitness) return -1;
            if (a.fitness > b.fitness) return 1;
            return 0;
        });
        population = population.splice(0, initialPopulation);
        yield {result: population[0], size: population.length, gen};
    }
};

export default GA;
