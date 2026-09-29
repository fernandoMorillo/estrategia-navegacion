
export interface RouteResult {
    origen: string;
    destino: string;
    distanciaKm: number;
    tiempoMinutos: number;
    viaRecomendada: string;
    colorRuta: string;
}

export interface RouteStrategy {
    calculateRoute(start: string, end: string): RouteResult;
}

//  Estrategias Concreta
export class FastestRouteStrategy implements RouteStrategy {
    calculateRoute(start: string, end: string): RouteResult {
        return {
            origen: start,
            destino: end,
            distanciaKm: 6.5,
            tiempoMinutos: 15,
            viaRecomendada: "Avenida Pedro de Heredia (Prioriza velocidad máxima)",
            colorRuta: "#ef4444", // Rojo
        };
    }
}

export class ShortestRouteStrategy implements RouteStrategy {
    calculateRoute(start: string, end: string): RouteResult {
        return {
            origen: start,
            destino: end,
            distanciaKm: 4.8,
            tiempoMinutos: 22,
            viaRecomendada: "Calles internas Centro Histórico (Menor distancia física)",
            colorRuta: "#3b82f6", // Azul
        };
    }
}

export class EconomicRouteStrategy implements RouteStrategy {
    calculateRoute(start: string, end: string): RouteResult {
        return {
            origen: start,
            destino: end,
            distanciaKm: 7.2,
            tiempoMinutos: 28,
            viaRecomendada: "Ruta perimetral (Evita zonas de peaje o alta congestión)",
            colorRuta: "#10b981", // Verde
        };
    }
}

// El Contexto
export class RouteNavigator {
    private strategy: RouteStrategy;

    constructor(strategy: RouteStrategy) {
        this.strategy = strategy;
    }

    // Permite cambiar la estrategia en tiempo de ejecución
    public setStrategy(strategy: RouteStrategy) {
        this.strategy = strategy;
    }

    // Delega el cálculo a la estrategia actual
    public buildRoute(start: string, end: string): RouteResult {
        return this.strategy.calculateRoute(start, end);
    }
}