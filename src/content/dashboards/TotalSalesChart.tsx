import { FC } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { alpha, useTheme } from '@mui/material';

interface TotalSalesChartProps {
  data: any[];
  labels: string[];
}

const TotalSalesChart: FC<TotalSalesChartProps> = ({
  data: dataProp,
  labels,
  ...rest
}) => {
  const theme = useTheme();

  const data = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    const primaryGradient = ctx.createLinearGradient(6, 6, 6, 150);

    primaryGradient.addColorStop(0, alpha(theme.colors.primary.light, 0.8));
    primaryGradient.addColorStop(0.8, theme.colors.alpha.white[10]);
    primaryGradient.addColorStop(1, theme.colors.alpha.white[100]);

    return {
      datasets: [
        {
          data: dataProp,
          borderWidth: 1,
          borderColor: theme.colors.primary.main,
          pointBorderWidth: 0,
          pointRadius: 2,
          pointHoverRadius: 2
        }
      ],
      labels
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: true
          },
          ticks: {
            display: true
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            display: true
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      mode: 'nearest',
      intersect: false,
      caretSize: 6,
      displayColors: false,
      yPadding: 8,
      xPadding: 16,
      borderWidth: 4,
      borderColor: theme.palette.common.black,
      backgroundColor: theme.palette.common.black,
      titleFontColor: theme.palette.common.white,
      bodyFontColor: theme.palette.common.white,
      footerFontColor: theme.palette.common.white,
      callbacks: {
        title: () => { },
        label: (tooltipItem: any) => {
          return `Sales: $${tooltipItem.yLabel}`;
        }
      }
    }
  };

  return (
    <div {...rest}>
      <Line data={data} options={options} />
    </div>
  );
};

TotalSalesChart.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired
};

export default TotalSalesChart;
