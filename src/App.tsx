import React, { useState, useMemo } from 'react';
import {
  RouteNavigator,
  FastestRouteStrategy,
  ShortestRouteStrategy,
  EconomicRouteStrategy,
  type RouteResult
} from './RoutingEngine';



export default function App() {

  const [origen, setOrigen] = useState('Manga');
  const [destino, setDestino] = useState('Bocagrande');
  const [estrategiaActiva, setEstrategiaActiva] = useState('Rapida');


  const navigator = useMemo(() => new RouteNavigator(new FastestRouteStrategy()), []);


  const [rutaCalculada, setRutaCalculada] = useState<RouteResult | null>(null);

  const calcularRuta = (tipoEstrategia: string) => {
    setEstrategiaActiva(tipoEstrategia);

    // Cambiamos la estrategia dinámicamente según el botón presionado
    if (tipoEstrategia === 'Rapida') {
      navigator.setStrategy(new FastestRouteStrategy());
    } else if (tipoEstrategia === 'Corta') {
      navigator.setStrategy(new ShortestRouteStrategy());
    } else if (tipoEstrategia === 'Economica') {
      navigator.setStrategy(new EconomicRouteStrategy());
    }

    // Ejecutamos el cálculo sin importar qué estrategia esté activa
    const resultado = navigator.buildRoute(origen, destino);
    setRutaCalculada(resultado);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2>Motor de Navegación Logística</h2>
        <p>Demostración del patrón de diseño <strong>Strategy</strong></p>
      </header>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Panel de Controles */}
        <div style={{ flex: '1', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Punto de Origen:</label>
            <input
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Punto de Destino:</label>
            <input
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <h4 style={{ margin: '10px 0' }}>Criterio de Navegación:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => calcularRuta('Rapida')}
              style={{ padding: '10px', background: estrategiaActiva === 'Rapida' ? '#ef4444' : '#ddd', color: estrategiaActiva === 'Rapida' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ruta más Rápida (Tiempo)
            </button>
            <button
              onClick={() => calcularRuta('Corta')}
              style={{ padding: '10px', background: estrategiaActiva === 'Corta' ? '#3b82f6' : '#ddd', color: estrategiaActiva === 'Corta' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ruta más Corta (Distancia)
            </button>
            <button
              onClick={() => calcularRuta('Economica')}
              style={{ padding: '10px', background: estrategiaActiva === 'Economica' ? '#10b981' : '#ddd', color: estrategiaActiva === 'Economica' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ruta Económica (Ahorro)
            </button>
          </div>
        </div>


        <div style={{ flex: '2', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <h3>Mapa Simulado</h3>

          {rutaCalculada ? (
            <div style={{ flex: 1 }}>

              <div style={{
                height: '150px',
                background: '#e5e7eb',
                borderRadius: '8px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 40px',
                marginTop: '20px'
              }}>
                <div style={{ width: '20px', height: '20px', background: 'black', borderRadius: '50%' }} title={origen}></div>


                <div style={{
                  flex: 1,
                  height: '6px',
                  background: rutaCalculada.colorRuta,
                  transition: 'background 0.3s ease'
                }}></div>

                <div style={{ width: '20px', height: '20px', background: 'black', borderRadius: '50%' }} title={destino}></div>
              </div>


              <div style={{ marginTop: '20px', padding: '15px', border: `2px solid ${rutaCalculada.colorRuta}`, borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: rutaCalculada.colorRuta }}>Resultados del algoritmo:</h4>
                <p><strong>Vía elegida:</strong> {rutaCalculada.viaRecomendada}</p>
                <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
                  <p style={{ fontSize: '1.2rem', margin: 0 }}>⏱️ {rutaCalculada.tiempoMinutos} min</p>
                  <p style={{ fontSize: '1.2rem', margin: 0 }}>📏 {rutaCalculada.distanciaKm} km</p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              Seleccione un criterio para calcular la ruta.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}