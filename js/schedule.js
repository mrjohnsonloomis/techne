document.addEventListener('DOMContentLoaded', function () {
  fetch('schedule.json')
    .then(function (r) { return r.json(); })
    .then(renderSchedule)
    .catch(function (e) { console.error('Schedule load error:', e); });
});

function renderSchedule(data) {
  var tabsEl   = document.getElementById('schedule-tabs');
  var panelsEl = document.getElementById('schedule-panels');
  var defaultDay = 'monday';

  data.days.forEach(function (day) {
    // Tab button
    var btn = document.createElement('button');
    btn.className  = 'tab-btn' + (day.id === defaultDay ? ' active' : '');
    btn.textContent = day.label;
    btn.dataset.day = day.id;
    btn.addEventListener('click', function () { activateTab(day.id); });
    tabsEl.appendChild(btn);

    // Panel
    var panel = document.createElement('div');
    panel.className = 'tab-panel' + (day.id === defaultDay ? ' active' : '');
    panel.id = 'panel-' + day.id;
    panel.innerHTML = renderPanel(day);
    panelsEl.appendChild(panel);
  });
}

function activateTab(dayId) {
  document.querySelectorAll('.tab-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.day === dayId);
  });
  document.querySelectorAll('.tab-panel').forEach(function (p) {
    p.classList.toggle('active', p.id === 'panel-' + dayId);
  });
}

function renderPanel(day) {
  var events = day.events.map(function (ev) {
    return (
      '<div class="timeline-item">' +
        '<div class="timeline-time">' + ev.time + '</div>' +
        '<div class="timeline-event event--' + ev.type + '">' +
          '<h4>' + ev.title + '</h4>' +
          (ev.description ? '<p>' + ev.description + '</p>' : '') +
        '</div>' +
      '</div>'
    );
  }).join('');

  return (
    '<h2 class="day-label">' +
      day.subtitle +
      '<span class="day-date">' + day.fullDate + '</span>' +
    '</h2>' +
    '<div class="timeline">' + events + '</div>'
  );
}
