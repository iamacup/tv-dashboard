
/* eslint-disable no-undef */

// every 10 mins - this unit is secconds
const updatefrequency = 60 * 10;
// unit is in seconds
const numberUpdateDelay = 15;

const drawDownloadToSignUpChart = (data) => {
  const myChart = echarts.init(document.getElementById('main5'));

  // data.seriesLabels is stupid for some reason? so we use this
  const seriesLabels = [
    'Download', // 'First Open',
    'Sign Up (First Login)', // 'First Login',
    'Onboarding Questions Completed', // 'Onboarding Questions Completed',
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
    legend: {
      data: seriesLabels,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '8%',
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
  let lastPeriod = 0;

  if (series.length >= 8) {
    lastPeriod = series[series.length - 8].value;
  }

  const target = Math.ceil(((lastPeriod / 100) * 30) + lastPeriod);

  const options = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
  };

  const dau1Num = Number.parseInt($('#dau1').text().replace(',', ''), 10);
  new CountUp('dau1', dau1Num, today, 0, numberUpdateDelay, options).start();

  const dau2Num = Number.parseInt($('#dau2').text().replace(',', ''), 10);
  new CountUp('dau2', dau2Num, lastPeriod, 0, numberUpdateDelay, options).start();

  if (target === 0) {
    $('#dau3').text('TBC');
  } else {
    const dau3Num = Number.parseInt($('#dau3').text().replace(',', ''), 10);
    new CountUp('dau3', dau3Num, target, 0, numberUpdateDelay, options).start();
  }
};

const drawMAUChart = (data) => {
  const series = data.series[0];

  const today = series[series.length - 1].value;
  let lastPeriod = 0;

  if (series.length >= 8) {
    lastPeriod = series[series.length - 2].value;
  }

  const target = Math.ceil(((lastPeriod / 100) * 30) + lastPeriod);

  const options = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
  };

  const dau1Num = Number.parseInt($('#mau1').text().replace(',', ''), 10);
  new CountUp('mau1', dau1Num, today, 0, numberUpdateDelay, options).start();

  const dau2Num = Number.parseInt($('#mau2').text().replace(',', ''), 10);
  new CountUp('mau2', dau2Num, lastPeriod, 0, numberUpdateDelay, options).start();

  if (target === 0) {
    $('#mau3').text('TBC');
  } else {
    const dau3Num = Number.parseInt($('#mau3').text().replace(',', ''), 10);
    new CountUp('mau3', dau3Num, target, 0, numberUpdateDelay, options).start();
  }
};

const drawUsersChart = (data) => {
  const series = data.series[0];

  const today = series[series.length - 1].value;
  let allTime = 0;
  let lastSeven = 0;
  let count = 0;

  for (let a = series.length - 1; a > -1; a--) {
    allTime += series[a].value;

    if (count < 7) {
      count++;
      lastSeven += series[a].value;
    }
  }

  const options = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
  };

  const dau1Num = Number.parseInt($('#users1').text().replace(',', ''), 10);
  new CountUp('users1', dau1Num, allTime, 0, numberUpdateDelay, options).start();

  const dau2Num = Number.parseInt($('#users2').text().replace(',', ''), 10);
  new CountUp('users2', dau2Num, lastSeven, 0, numberUpdateDelay, options).start();

  const dau3Num = Number.parseInt($('#users3').text().replace(',', ''), 10);
  new CountUp('users3', dau3Num, today, 0, numberUpdateDelay, options).start();
};

const drawDownloadsChart = (data) => {
  const series = data.series[0];

  const today = series[series.length - 1].value;
  let allTime = 0;
  let lastSeven = 0;
  let count = 0;

  for (let a = series.length - 1; a > -1; a--) {
    allTime += series[a].value;

    if (count < 7) {
      count++;
      lastSeven += series[a].value;
    }
  }

  const options = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
  };

  const dau1Num = Number.parseInt($('#downloads1').text().replace(',', ''), 10);
  new CountUp('downloads1', dau1Num, allTime, 0, numberUpdateDelay, options).start();

  const dau2Num = Number.parseInt($('#downloads2').text().replace(',', ''), 10);
  new CountUp('downloads2', dau2Num, lastSeven, 0, numberUpdateDelay, options).start();

  const dau3Num = Number.parseInt($('#downloads3').text().replace(',', ''), 10);
  new CountUp('downloads3', dau3Num, today, 0, numberUpdateDelay, options).start();
};

const drawArticlesChart = (data) => {
  const series = data.series[0];

  const today = series[series.length - 1].value;
  let allTime = 0;
  let lastSeven = 0;
  let count = 0;

  for (let a = series.length - 1; a > -1; a--) {
    allTime += series[a].value;

    if (count < 7) {
      count++;
      lastSeven += series[a].value;
    }
  }

  const options = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
  };

  const dau1Num = Number.parseInt($('#articles1').text().replace(',', ''), 10);
  new CountUp('articles1', dau1Num, allTime, 0, numberUpdateDelay, options).start();

  const dau2Num = Number.parseInt($('#articles2').text().replace(',', ''), 10);
  new CountUp('articles2', dau2Num, lastSeven, 0, numberUpdateDelay, options).start();

  const dau3Num = Number.parseInt($('#articles3').text().replace(',', ''), 10);
  new CountUp('articles3', dau3Num, today, 0, numberUpdateDelay, options).start();
};

const drawStickinessChart = (data) => {
  const myChart = echarts.init(document.getElementById('main8'));

  const seriesData = [];
  let count = 0;

  data.series[0].combined.forEach((value) => {
    if (count !== 0) {
      const percentage = (value.count / value.outof) * 100;
      seriesData.push(percentage);
    }

    count++;
  });

  const option = {
    xAxis: {
      type: 'category',
      data: ['1 Day', '2 Days', '3 Days', '4 Days', '5 Days', '6 Days', '7 Days'],
    },
    yAxis: {
      type: 'value',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '3%',
      containLabel: true,
    },
    series: [{
      data: seriesData,
      type: 'line',
      smooth: true,
    }],
  };

  myChart.setOption(option);
};

drawReturningUsersChart = (data) => {
  const myChart = echarts.init(document.getElementById('main9'));

  const seriesData = [];

  for (let a = 0; a < data.series[0].length; a++) {
    seriesData.push(data.series[0][a].value - data.series[1][a].value);
  }

  console.log(seriesData);

  const option = {
    xAxis: {
      type: 'category',
      data: data.xValues,
    },
    yAxis: {
      type: 'value',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '3%',
      containLabel: true,
    },
    series: [{
      data: seriesData,
      type: 'line',
      smooth: true,
    }],
  };

  myChart.setOption(option);
};

const drawCharts = async () => {
  const response = await axios.get('http://localhost:8080/update');

  console.log('Drawing Charts');

  if (response.data.generalStatus === 'success') {
    drawDownloadToSignUpChart(response.data.payload.downloadToSignUp);
    drawDAUChart(response.data.payload.dau);
    drawMAUChart(response.data.payload.mau);
    drawUsersChart(response.data.payload.users);
    drawDownloadsChart(response.data.payload.downloads);
    drawArticlesChart(response.data.payload.articles);
    drawStickinessChart(response.data.payload.stickiness);
    drawReturningUsersChart(response.data.payload.returningUsers);
  } else {
    console.log('ERROR!!!');
    console.log(response);
  }

  setTimeout(drawCharts, updatefrequency * 1000);
};

drawCharts();

