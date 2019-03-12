Page({
  data: {
      month_en_map: ['January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
      ],
      month_en: 'January',
      year: 2017,
      month: 11,
      max_mon: [1, 3, 5, 7, 8, 10, 12],
      min_mon: [4, 6, 9, 11],
      max_mon_days: [1, 2, 3, 4, 5],
      today: 0
  },
  onLoad: function () {
      this.setCurrentTimestamp();
      this.setCurrentDate();
  },
    setCurrentDate() {
        let dateObj = new Date(),
            map = this.data.month_en_map;

        this.setData({
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            month_en: map[dateObj.getMonth()]
        });

        let daysInMonth = this.getDaysInMonth(this.data.month);
        this.setData({
            daysInMonth: daysInMonth
        });
    },
    getCurrentTimestamp() {
        let obj = new Date();
        let date = new Date(obj.getFullYear(), obj.getMonth(), obj.getDate());

        return date.getTime() / 1000;
    },
    setCurrentTimestamp() {
        let today = this.getCurrentTimestamp();
        this.setData({
            today: today
        });
    },
    isLeapYear(year) {
        return (((year / 4 === 0) && year % 100 !== 0) || year % 400 === 0);
    },
    getDaysInMonth(month) {
        let firstDateObj = new Date(this.data.year, this.data.month - 1, 1),
            weekStart = firstDateObj.getDay(),
            days;
        if (this.data.max_mon.indexOf(month) !== -1) {
            let lastDateObj = new Date(this.data.year, this.data.month - 1, 31),
                weekEnd = lastDateObj.getDay();
            days = Array.from(
                new Array(weekStart),
                () => 0
            ).concat(
                Array.from(
                    new Array(31),
                    (val, index) => index + 1
                )
            ).concat(
                Array.from(
                    new Array(6 - weekEnd),
                    (val, index) => 0
                )
            );
        } else if (this.data.min_mon.indexOf(month) > -1) {
            let lastDateObj = new Date(this.data.year, this.data.month - 1, 30),
                weekEnd = lastDateObj.getDay();
            days = Array.from(
                new Array(weekStart),
                () => 0
            ).concat(
                Array.from(
                    new Array(30),
                    (val, index) => index + 1
                )
            ).concat(
                Array.from(
                    new Array(6 - weekEnd),
                    (val, index) => 0
                )
            );

        } else if (month === 2) {
            if (this.isLeapYear(this.data.year)) {
                let lastDateObj = new Date(this.data.year, this.data.month - 1, 29),
                    weekEnd = lastDateObj.getDay();
                days = Array.from(
                    new Array(weekStart),
                    () => 0
                ).concat(
                    Array.from(
                        new Array(29),
                        (val, index) => index + 1
                    )
                ).concat(
                    Array.from(
                        new Array(6 - weekEnd),
                        (val, index) => 0
                    )
                );
            } else {
                let lastDateObj = new Date(this.data.year, this.data.month - 1, 28),
                    weekEnd = lastDateObj.getDay();
                days = Array.from(
                    new Array(weekStart),
                    () => 0
                ).concat(
                    Array.from(
                        new Array(28),
                        (val, index) => index + 1
                    )
                ).concat(
                    Array.from(
                        new Array(6 - weekEnd),
                        (val, index) => 0
                    )
                );
            }
        }

        let daysInMonth = [];

        for (let i in days) {
            let day = {
                num: days[i],
                timestamp: 0
            };
            if (!day.num) {
                daysInMonth.push(day);
                continue;
            }

            let dayObj = new Date(this.data.year, this.data.month - 1, day.num, 0, 0, 0);
            day.timestamp = dayObj.getTime() / 1000;
            daysInMonth.push(day);
        }

        return daysInMonth;
    },
    getPreMonth() {
        this.setCurrentTimestamp();
        let dateObj = new Date(this.data.year, this.data.month - 2),
            map = this.data.month_en_map;

        this.setData({
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            month_en: map[dateObj.getMonth()]
        });

        let daysInMonth = this.getDaysInMonth(this.data.month);
        this.setData({
            daysInMonth: daysInMonth
        });
    },
    getNextMonth() {
        this.setCurrentTimestamp();
        let dateObj = new Date(this.data.year, this.data.month),
            map = this.data.month_en_map;

        this.setData({
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            month_en: map[dateObj.getMonth()]
        });

        let daysInMonth = this.getDaysInMonth(this.data.month);
        this.setData({
            daysInMonth: daysInMonth
        });
    }
})
