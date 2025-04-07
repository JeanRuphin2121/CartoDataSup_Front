import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PublicVsPrivate = () => {
  const [data, setData] = useState([]);
  const [commune, setCommune] = useState('');
  const [academie, setAcademie] = useState('');

  useEffect(() => {
    fetchStats();
  }, [commune, academie]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/stats-etablissement/', {
        params: { commune, academie },
      });
      setData(response.data);
    } catch (error) {
      console.error('Erreur chargement données :', error);
    }
  };

  const chartData = {
    labels: data.map(item => item.status),
    datasets: [
      {
        label: 'Formations',
        data: data.map(item => item.nombre_formations),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Candidatures',
        data: data.map(item => item.total_candidatures),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Femmes candidates',
        data: data.map(item => item.total_femmes),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      }
    ],
  };

  return (
    <div>
      <h2>📊 Statistiques Public vs Privé</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Commune : </label>
        <select onChange={e => setCommune(e.target.value)}>
          <option value="">Toutes</option>
          <option value="Redon">Redon</option>
          <option value="Rennes">Rennes</option>
          {/* Ajoute plus de communes ici */}
        </select>

        <label style={{ marginLeft: '1rem' }}>Académie : </label>
        <select onChange={e => setAcademie(e.target.value)}>
          <option value="">Toutes</option>
          <option value="Rennes">Rennes</option>
          <option value="Nantes">Nantes</option>
          {/* Ajoute plus d'académies ici */}
        </select>
      </div>

      <Bar data={chartData} options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Comparaison des indicateurs par statut d’établissement' },
        },
      }} />
    </div>
  );
};

export default PublicVsPrivate;
