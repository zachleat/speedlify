function uuid() {
	return Math.round(Math.random() * 10e9).toString(36);
}

/**
 * Convert a timestamp in milliseconds to a month & date string, e.g. `Mar 31`.
 * @param {number} timestamp Millisecond UNIX epoch timestamp
 * @returns {string}
 */
function msToDate(timestamp) {
	const date = new Date(timestamp);
	return date.toLocaleDateString(['en-US'], { day: 'numeric', month: 'short' });
}

/**
 * Convert a timestamp in milliseconds to an ISO format date string.
 * @param {number} timestamp Millisecond UNIX epoch timestamp
 * @returns {string}
 */
function msToISO(timestamp) {
	const date = new Date(timestamp);
	return date.toISOString();
}

/**
 * Round a number to an arbitrary precision.
 * @param {number} n Number to round
 * @param {number} decimals Number of decimals to round to
 * @returns {number} Rounded number
 */
function round(n, decimals = 1) {
	const power = 10 ** decimals;
	return Math.round(n * power) / power;
}

/**
 * Get the `d` attribute for an SVG path representing a sparkline.
 * @param {number[]} data
 * @param {number} w
 * @param {number} h
 * @param {number} maxY
 * @returns {string}
 */
function getD(data, w, h, maxY) {
	/** @type {string[]} */
	let l = [];
	const maxX = data.length - 1;
	for (let i = 0; i <= maxX; i++) {
		l.push(round((i / maxX) * w) + ',' + round(h - (data[i] / maxY) * h));
	}
	return `M ${l.join(' L ')}`;
}

/**
 * Get an SVG `<linearGradient>` definition.
 * @param {{ color: string; offset: `${number}%`}[]} gradient - Color stops
 * @param {string} id - Random ID used to associate gradient with stroke/fill.
 * @returns {string}
 */
function getLinearGradient(gradient, id) {
	const stops = gradient
		.map((s) => `<stop stop-color="${s.color}" offset="${s.offset}" />`)
		.join('');

	return (
		`<linearGradient id="${id}" x1="0" x2="0" y1="100%" y2="0" gradientUnits="userSpaceOnUse">` +
		stops +
		`</linearGradient>`
	);
}

/**
 * @typedef {Object} SparklineOptions
 * @property {number[]} values - Array of values along the y axis to draw.
 * @property {number} [min] - Minimum value on the y axis (defaults to smallest value in `values`).
 * @property {number} [max] - Maximum value on the y axis (defaults to largest value in `values`).
 * @property {string} [color] - Color to draw the sparkline with (defaults to white). Overridden if `gradient` is set.
 * @property {{ color: string; offset: `${number}%` }[]} [gradient] - Gradient definition to draw the sparkline with.
 * @property {(val: number) => string | number} [formatAxis] - Formatter for y-axis legend.
 * @property {{ timestamp: number }[]} [timeSeries] - Sorted array of `performance-leaderboard` runs to extract timestamps from.
 */

/**
 * Generate HTML for a sparkline.
 * @param {SparklineOptions} opts
 * @return {string}
 */
function Sparkline({
	values,
	min = Math.min(...values),
	max = Math.max(...values),
	color = '#ffffff',
	gradient,
	formatAxis = (val) => val,
	timeSeries,
}) {
	// If we only have one data point, duplicate it to draw a straight line.
	if (values.length === 1) values.push(...values);

	const minVal = Math.min(...values);
	const maxVal = Math.max(...values);
	const caption = `Sparkline ranging between ${formatAxis(minVal)} and ${formatAxis(maxVal)}.`;

	const data = values.map((val) => Math.max(0, Math.round(val) - min));
	const maxY = Math.max(...data, max - min);
	const [width, height] = [70, 40];

	const startTime = timeSeries?.at(0)?.timestamp;
	const endTime = timeSeries?.at(-1)?.timestamp;

	const d = getD(data, width, height, maxY);
	const id = uuid();

	return `<div class="sparkline">
	<div class="y-axis" aria-hidden="true">
		<div>${formatAxis(min)}</div>
		<div>${formatAxis(max)}</div>
	</div>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="none"
		viewBox="0 0 ${width} ${height}"
	>
		<title>${caption}</title>
		<path
			fill="transparent"
			stroke="${gradient ? `url(#${id})` : color}" d="${d}"
		/>
		${gradient ? getLinearGradient(gradient, id) : ''}
	</svg>
	${
		startTime && endTime
			? `
	<div class="x-axis">
		<time datetime="${msToISO(startTime)}">${msToDate(startTime)}</time>
		<time datetime="${msToISO(startTime)}">${msToDate(endTime)}</time>
	</div>`
			: ''
	}
</div>`;
}

module.exports = Sparkline;
