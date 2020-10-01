import { win } from "@varunsridharan/js-vars";

export default function() {
	if( !Date.now ) {
		Date.now = () => new Date().getTime();
	}
	let perf = win.performance || {};

	if( perf && perf.now ) {
		return;
	}

	if( perf.timing && perf.timing.navigationStart && perf.mark && perf.clearMarks && perf.getEntriesByName ) {
		perf.now = function() {
			perf.clearMarks( '__PERFORMANCE_NOW__' );
			perf.mark( '__PERFORMANCE_NOW__' );
			return perf.getEntriesByName( '__PERFORMANCE_NOW__' )[ 0 ].startTime;
		};
	} else if( 'now' in perf === false ) {
		var nowOffset = Date.now();

		if( perf.timing && perf.timing.navigationStart ) {
			nowOffset = perf.timing.navigationStart;
		}
		perf.now = () => Date.now() - nowOffset;
	}
}
