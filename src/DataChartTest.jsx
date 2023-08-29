import React, { useEffect } from "react";
import ApexChart from "react-apexcharts";

const DataChartTest = () => {
  // 캔들스틱 데이터 예시
  const candlestickData = [
    {
      x: new Date(1538778600000),
      y: [6629.81, 6650.5, 6623.04, 6633.33],
    },
    {
      x: new Date(1538780400000),
      y: [6632.01, 6643.59, 6620, 6630.11],
    },
    {
      x: new Date(1538782200000),
      y: [6630.71, 6648.95, 6623.34, 6635.65],
    },
    {
      x: new Date(1538784000000),
      y: [6635.65, 6651, 6629.67, 6638.24],
    },
    {
      x: new Date(1538785800000),
      y: [6638.24, 6640, 6620, 6624.47],
    },
    {
      x: new Date(1538787600000),
      y: [6624.53, 6636.03, 6621.68, 6624.31],
    },
    {
      x: new Date(1538789400000),
      y: [6624.61, 6632.2, 6617, 6626.02],
    },
    {
      x: new Date(1538791200000),
      y: [6627, 6627.62, 6584.22, 6603.02],
    },
    {
      x: new Date(1538793000000),
      y: [6605, 6608.03, 6598.95, 6604.01],
    },
    {
      x: new Date(1538794800000),
      y: [6604.5, 6614.4, 6602.26, 6608.02],
    },
    {
      x: new Date(1538796600000),
      y: [6608.02, 6610.68, 6601.99, 6608.91],
    },
    {
      x: new Date(1538798400000),
      y: [6608.91, 6618.99, 6608.01, 6612],
    },
    {
      x: new Date(1538800200000),
      y: [6612, 6615.13, 6605.09, 6612],
    },
    {
      x: new Date(1538802000000),
      y: [6612, 6624.12, 6608.43, 6622.95],
    },
    {
      x: new Date(1538803800000),
      y: [6623.91, 6623.91, 6615, 6615.67],
    },
    {
      x: new Date(1538805600000),
      y: [6618.69, 6618.74, 6610, 6610.4],
    },
    {
      x: new Date(1538807400000),
      y: [6611, 6622.78, 6610.4, 6614.9],
    },
    {
      x: new Date(1538809200000),
      y: [6614.9, 6626.2, 6613.33, 6623.45],
    },
    {
      x: new Date(1538811000000),
      y: [6623.48, 6627, 6618.38, 6620.35],
    },
    {
      x: new Date(1538812800000),
      y: [6619.43, 6620.35, 6610.05, 6615.53],
    },
    {
      x: new Date(1538814600000),
      y: [6615.53, 6617.93, 6610, 6615.19],
    },
    {
      x: new Date(1538816400000),
      y: [6615.19, 6621.6, 6608.2, 6620],
    },
    {
      x: new Date(1538818200000),
      y: [6619.54, 6625.17, 6614.15, 6620],
    },
    {
      x: new Date(1538820000000),
      y: [6620.33, 6634.15, 6617.24, 6624.61],
    },
    {
      x: new Date(1538821800000),
      y: [6625.95, 6626, 6611.66, 6617.58],
    },
  ];

  // 이동평균 계산 함수
  const calculateMovingAverage = (data, windowSize) => {
    const movingAverages = [];

    for (let i = windowSize - 1; i < data.length; i++) {
      let sum = 0;
      for (let j = i - windowSize + 1; j <= i; j++) {
        sum += data[j].y[3]; // 종가에 대한 이동평균 계산
      }
      const average = sum / windowSize;
      movingAverages.push({ x: data[i].x, y: average });
    }

    return movingAverages;
  };

  // 이동평균 데이터 계산
  const windowSize = 5; // 이동평균 윈도우 크기 설정
  const movingAverageData = calculateMovingAverage(candlestickData, windowSize);

  // 이동평균을 포함한 데이터 가공
  const candleDataWithMA = movingAverageData
    .slice(windowSize - 1)
    .map((data, index) => ({
      x: data.x,
      y: data.y,
      movingAverage: movingAverageData[index],
    }));

  console.log("data", candlestickData);
  console.log(movingAverageData);
  console.log("ma", candleDataWithMA[0].movingAverage.y);
  // 그래프 옵션
  const chartOptions = {
    series: [
      {
        name: "candle data",
        type: "candlestick",
        data: candlestickData.map((price) => ({
          x: price.x,
          y: [price.y[0], price.y[1], price.y[2], price.y[3]],
        })),
      },
      {
        name: "Moving Average",
        type: "line",
        data: candleDataWithMA.map((price) => ({
          x: price.x,
          y: price.movingAverage.y,
        })),
      },
    ],
    chart: {
      type: "line",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <ApexChart
      options={chartOptions}
      series={chartOptions.series}
      type="candlestick"
      height={350}
    />
  );
};

export default DataChartTest;
