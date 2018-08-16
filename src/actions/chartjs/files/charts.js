
/* eslint-disable no-undef */

const updateFrequency = 15;

const drawDownloadToSignUpChart = (data) => {
  const myChart = echarts.init(document.getElementById('main5'));

  // data.seriesLabels is stupid for some reason? so we use this
  const seriesLabels = [
    'First Open',
    'First Login',
    'Onboarding Questions Completed',
  ];

  const series = [];

  seriesLabels.forEach((value, index) => {
    const subData = [];

    data.series[index].forEach((subValue) => {
      subData.push(subValue.value);
    });

    series.push({
      name: value,
      type: 'line',
      stack: 'main',
      areaStyle: { normal: {} },
      data: subData,
    });
  });

  // specify chart configuration item and data
  const option = {
    title: {
      text: 'Download to Sign-Up',
    },
    legend: {
      data: seriesLabels,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.xValues,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series,
  };

  // use configuration item and data specified to show chart
  myChart.setOption(option);
};

const drawDAUChart = (data) => {
  const series = data.series[0];

  const today = series[series.length - 1].value;
  let lastWeek = 0;

  if (series.length >= 8) {
    lastWeek = series[series.length - 8].value;
  }

  const options = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
  };

  const dau1Num = Number.parseInt($('#dau1').text(), 10);
  new CountUp('dau1', dau1Num, today, 0, updateFrequency, options).start();

  const dau2Num = Number.parseInt($('#dau2').text(), 10);
  new CountUp('dau2', dau2Num, lastWeek, 0, updateFrequency, options).start();

  const dau3Num = Number.parseInt($('#dau3').text(), 10);
  new CountUp('dau3', dau3Num, Math.ceil(((lastWeek / 100) * 30) + lastWeek), 0, updateFrequency, options).start();


  // today
  // against same time last week (up down)
  // against target (up down)
};

const drawMAUChart = (data) => {

};

const drawCharts = async () => {
  const response = await axios.get('http://localhost:8080/update');

  console.log('Drawing Charts');

  if (response.data.generalStatus === 'success') {
    drawDownloadToSignUpChart(response.data.payload.downloadToSignUp);
    drawDAUChart(response.data.payload.dau);
    drawMAUChart(response.data.payload.mau);
  } else {
    console.log('ERROR!!!');
    console.log(response);
  }

  setTimeout(drawCharts, updateFrequency * 1000);
};

drawCharts();

