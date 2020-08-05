;(function() {
	if(!("customElements" in window) || !("Intl" in window) || !Intl.RelativeTimeFormat) {
		return;
	}
	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

	customElements.define("timestamp-ago", class extends HTMLElement {
		connectedCallback() {
			let timestamp = this.getAttribute("timestamp");
			if(timestamp) {
				let date = (new Date()).setTime(timestamp);
				let diff = ((date - Date.now())/(1000 * 60 * 60 * 24)).toFixed(1);
				this.setAttribute("data-timestamp-ago-original", this.innerText);
				this.innerText = rtf.format(diff, "day");
			}
		}
	});
})();