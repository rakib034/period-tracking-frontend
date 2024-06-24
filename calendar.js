document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    let selectedDates = [];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function renderCalendar(month, year) {
        const today = new Date();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const calendarDays = [];

        for (let i = 0; i < firstDay; i++) {
            calendarDays.push('');
        }

        for (let i = 1; i <= lastDate; i++) {
            calendarDays.push(i);
        }

        const calendarHTML = `
            <div class="calendar-header">
                <button onclick="prevMonth()">&#9664;</button>
                <span>${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}</span>
                <button onclick="nextMonth()">&#9654;</button>
            </div>
            <div class="calendar-body">
                ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => `<div class="day">${day}</div>`).join('')}
                ${calendarDays.map(day => `<div class="date${day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? ' today' : ''}${selectedDates.includes(day) ? ' selected' : ''}" onclick="selectDate(${day}, ${month}, ${year})">${day}</div>`).join('')}
            </div>
        `;

        calendar.innerHTML = calendarHTML;
    }

    window.selectDate = function(day, month, year) {
        if (!day) return;

        if (selectedDates.length === 2) {
            selectedDates = [];
        }

        selectedDates.push(day);

        if (selectedDates.length === 2) {
            const [start, end] = selectedDates.sort((a, b) => a - b);
            const dates = document.getElementsByClassName('date');
            for (let i = start + new Date(year, month, 1).getDay() - 1; i <= end + new Date(year, month, 1).getDay() - 1; i++) {
                dates[i].classList.add('selected');
            }
        }

        renderCalendar(currentMonth, currentYear);
    };

    window.prevMonth = function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar(currentMonth, currentYear);
    };

    window.nextMonth = function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar(currentMonth, currentYear);
    };

    renderCalendar(currentMonth, currentYear);
});
