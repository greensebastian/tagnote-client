export const truncated = (
	text: string,
	targetLength: number,
	leeway: number,
	divider: string = " "
) => {
	const words = text.split(divider);
	const output = words.reduce((prev, cur) => {
		if (
			prev.length >= targetLength ||
			prev.length + cur.length > targetLength + leeway
		) {
			return prev;
		} else {
			return prev + (prev.length > 0 ? divider : "") + cur;
		}
	}, "");
	return output.length >= text.length ? output : output + "...";
};