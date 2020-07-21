function makeTable(table) {
  let labels = [];
  let series = [];

  let rows = Array.from(table.querySelectorAll(":scope tbody tr"));
  let minY = 90;
  let maxY = 100;
  rows = rows.reverse();

  for(let row of rows) {
    let label = row.children[0].innerText.split(" ");
    labels.push(label.slice(0,2).join(" "));
    let childCount = row.children.length - 1;
    let seriesIndex = 0;
    for(let j = 0, k = childCount; j<k; j++) {
      let data = row.children[j + 1].dataset;
      if(data && data.numericValue) {
        minY = Math.min(data.numericValue, minY);
        maxY = Math.max(data.numericValue, maxY);
        if(!series[seriesIndex]) {
          series[seriesIndex] = [];
        }
        series[seriesIndex].push(data.numericValue);
        seriesIndex++;
      }
    }
  }

  let options = {
    high: Math.max(maxY, 100),
    low: Math.max(0, minY - 5),
    fullWidth: true,
    onlyInteger: true,
    showPoint: false,
    lineSmooth: true,
    axisX: {
      showGrid: true,
      showLabel: true
    },
    chartPadding: {
      right: 40
    }
  };

  new Chartist.Line(table.parentNode.nextElementSibling, {
    labels: labels,
    series: series
  }, options);
}

function initializeAllTables(scope) {
  let tables = scope.querySelectorAll("[data-make-chart]");
  for(let table of tables) {
    // make sure not in a closed details
    if(table.closest("details[open]") || !table.closest("details")) {
      makeTable(table);
    }
  }
}

initializeAllTables(document);

let details = document.querySelectorAll("details");
// let first = true;
for(let detail of details) {
  // open the first details by default
  // if(first) {
  //   detail.open = true;
  //   first = false;
  // }
  detail.addEventListener("toggle", function(e) {
    let open = e.target.hasAttribute("open");
    if(open) {
      initializeAllTables(e.target);
    }
    let row = e.target.closest(".leaderboard-list-entry-details");
    row.classList.toggle("expanded", open);
    row.previousElementSibling.classList.toggle("expanded", open);
  });
}

let expandAliases = document.querySelectorAll("[data-expand-alias]");
for(let alias of expandAliases) {
  alias.addEventListener("click", function(e) {
    e.preventDefault();
    let href = e.target.closest("a[href]").getAttribute("href");
    if(href) {
      let details = document.querySelector(href);
      if(details) {
        details.open = !details.hasAttribute("open");
      }
    }
  }, false);
}
