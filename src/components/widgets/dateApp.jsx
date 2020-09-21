import React, { Component } from "react";
import moment from "moment";

class DateComponent extends Component {
  state = {
    data: "",
    slectedfood: "",
    selectedDate: "",
    bgColor: "",

    items: [
      {
        day: "Sunday",
        item: "Chicken Biriyani",
      },
      {
        day: "Monday",
        item: "Idly",
      },
      {
        day: "Tuesday",
        item: "Dosa",
      },
      {
        day: "Wednesday",
        item: "Poori",
      },
      {
        day: "Thursday",
        item: "Chapati",
      },
      {
        day: "Friday",
        item: "Pulav",
      },
      {
        day: "Saturday",
        item: "Paratha",
      },
    ],
  };

  componentDidMount() {
    const { items } = this.state;
    this.getWeekDays();
    this.currentDate();
    const currentDay = this.currentDay();

    {
      items &&
        items.map((i) => {
          if (i.day === currentDay) {
            this.setState({ slectedfood: i.item });
            this.setState({ selectedDate: i.day });
            // this.setState({ bgColor: "#a4d7ed" });
          }
        });
    }
  }

  currentDay() {
    var today = new Date(),
      date =
        today.getFullYear() +
        " " +
        (today.getMonth() + 1) +
        " " +
        today.getDate();
    const res = moment(date).format("dddd");
    console.log(res);
    this.setState({ day: res });
    return res;
  }

  currentDate() {
    var today = new Date(),
      date =
        today.getFullYear() +
        " " +
        (today.getMonth() + 1) +
        " " +
        today.getDate();
    const res = moment(date).format("DD MMM dddd");
    this.setState({ date: res });
  }

  getWeekDays() {
    let DateArr = [];
    console.log("DateArr", DateArr);
    this.setState({ data: DateArr });

    for (let i = 0; i < 7; i++) {
      let date = new Date();
      let next = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
      let day = next.getDate();
      let month = next.getMonth() + 1;
      let year = next.getFullYear();
      let full = year + " " + month + " " + day;
      const res = moment(full).format("YYYY MMM DD dddd");
      DateArr.push(res);
    }
    return DateArr;
  }

  handleClick = (value) => {
    console.log(value);
    const abc = value.split(" ");
    console.log(abc);
    const { items } = this.state;
    {
      items &&
        items.map((i) => {
          if (i.day === abc[abc.length - 1]) {
            this.setState({ slectedfood: i.item });
            this.setState({ selectedDate: i.day });
          }
        });
    }
  };

  render() {
    const { data } = this.state;

    return (
      <React.Fragment>
        <div
          className="container"
          style={{
            backgroundColor: "#e6e6e6",
            borderRadius: 6,
            height: "100px",
            width: "100%",
            marginTop: "50px",
          }}
        >
          {data &&
            data.map((value) => {
              return (
                <span
                  className="day"
                  style={{ marginBottom: "50%" }}
                  onClick={() => this.handleClick(value)}
                >
                  {value}
                </span>
              );
            })}
        </div>
        <div>
          <span className="info">
            Day is:{" "}
            <b style={{ color: "red", marginBottom: "20px" }}>
              {this.state.selectedDate}
            </b>
          </span>
          <br />
          <br />
          <span className="info">
            Food Special is:{" "}
            <b style={{ color: "green" }}>{this.state.slectedfood}</b>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default DateComponent;
