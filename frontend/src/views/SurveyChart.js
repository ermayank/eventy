import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const SurveyChart = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [pie1, setPie1] = useState({});
  const [pie2, setPie2] = useState({});
  const [bar1, setBar1] = useState({});
  let aggregatedData = [];
  let mayank = {};
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/events/${id}`
      );
      const newData = await response.json();
      {
        const countedData = countBy(newData.survey[6], Math.floor);
        const countedDataKeys = Object.keys(countedData); //string
        let finalData = [];
        for (let i = 1; i <= 5; i++) {
          const l = i.toString();
          if (countedData[i] != undefined && countedDataKeys.includes(l)) {
            finalData.push(countedData[i]);
          } else {
            finalData.push(0);
          }
        }
        setPie1({
          labels: [
            "Social media",
            "Word of mouth",
            "Newsletter",
            "Advertisement",
            "Other",
          ],
          datasets: finalData,
        });
      }

      {
        const countedData = countBy(newData.survey[6], Math.floor);
        const countedDataKeys = Object.keys(countedData); //string
        let finalData = [];
        for (let i = 1; i <= 2; i++) {
          const l = i.toString();
          if (countedData[i] != undefined && countedDataKeys.includes(l)) {
            finalData.push(countedData[i]);
          } else {
            finalData.push(0);
          }
        }
        setPie2({
          labels: ["Yes", "No"],
          datasets: finalData,
        });
      }

      for (let i = 0; i <= 5; i++) {
        const countedData = countBy(newData.survey[i], Math.floor);
        const countedDataKeys = Object.keys(countedData); //string
        let finalData = [];

        for (let j = 1; j <= 5; j++) {
          const l = j.toString();
          if (countedData[j] != undefined && countedDataKeys.includes(l)) {
            finalData.push(countedData[j]);
          } else {
            finalData.push(0);
          }
        }

        aggregatedData.push(finalData);
        finalData = [];
      }
      let bar1Data = [];
      for (let i = 0; i <= 4; i++) {
        let arr = [];
        for (let j = 0; j <= 5; j++) {
          const m = aggregatedData[j][i];
          arr.push(m);
        }
        bar1Data.push(arr);
        arr = [];
      }

      setBar1((current) => [...bar1Data]);
    };

    fetchData();
  }, []);

  const countBy = (arr, fn) =>
    arr
      .map(typeof fn === "function" ? fn : (val) => val[fn])
      .reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

  const pie1Data = {
    labels: pie1.labels,
    datasets: [
      {
        label: "Got to Know about Event",
        data: pie1.datasets,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  };

  const pie2Data = {
    labels: pie2.labels,
    datasets: [
      {
        label: "Will attend Again",
        data: pie2.datasets,
        backgroundColor: ["#50AF95", "#f3ba2f"],
      },
    ],
  };

  //Bar Chart Options
  const barOptions = {
    plugins: {},
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const dataBar1 = {
    labels: [
      "How satisfied were you with the event?",
      "How well the the event meet your expectations?",
      "How Was this event interactive ?",
      "How likely you would recommend this event in the future to someone?",
      "What was your overall experience of the event",
      "How helpful was the staff at the event?",
    ],
    datasets: [
      {
        label: "Poor",
        data: bar1[0],
        backgroundColor: "#b82e2e",
      },
      {
        label: "Fair",
        data: bar1[1],
        backgroundColor: "#994499",
      },
      {
        label: "Neutral",
        data: bar1[2],
        backgroundColor: "#316395",
      },
      {
        label: "V. Good",
        data: bar1[3],
        backgroundColor: "#22aa99 ",
      },
      {
        label: "Excellent",
        data: bar1[4],
        backgroundColor: "#66aa00",
      },
    ],
  };

  return (
    <>
      <div className="flex container mx-auto justify-around p-5 flex-col md:flex-row items-center">
        <div className="my-2 mx-2 border-2 flex flex-col">
          <h1 className="text-center">Got to Know about Event</h1>
          <div style={{ width: 500 }}>
            <PieChart chartData={pie1Data} />
          </div>
        </div>

        <div className="my-2 mx-2 border-2 flex flex-col">
          <h1 className="text-center">Will attend Again</h1>
          <div style={{ width: 500 }}>
            <PieChart chartData={pie2Data} />
          </div>
        </div>
      </div>
      <div className="my-2 mx-2 border-2 flex items-center flex-col">
        <h1>Will attend Again</h1>
        <div className="text-center" style={{ width: 1200 }}>
          <BarChart chartData={dataBar1} options={barOptions} />
        </div>
      </div>
    </>
  );
};

export default SurveyChart;
