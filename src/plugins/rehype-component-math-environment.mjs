const environmentNames = {
	theorem: "Theorem",
	definition: "Definition",
	lemma: "Lemma",
	proposition: "Proposition",
	corollary: "Corollary",
	remark: "Remark",
	example: "Example",
	exercise: "Exercise",
	proof: "Proof",
};

function addQedSymbol(children) {
	const result = [...children];

	const qed = {
		type: "element",
		tagName: "span",
		properties: {
			className: ["math-environment__qed"],
			ariaLabel: "End of proof",
		},
		children: [{ type: "text", value: "□" }],
	};

	const lastChild = result[result.length - 1];

	// Put the square at the end of the final paragraph when possible.
	if (
		lastChild?.type === "element" &&
		lastChild.tagName === "p" &&
		Array.isArray(lastChild.children)
	) {
		lastChild.children.push({
			type: "text",
			value: " ",
		});
		lastChild.children.push(qed);
	} else {
		result.push(qed);
	}

	return result;
}

export function MathEnvironmentComponent(
	properties = {},
	children = [],
	type,
) {
	const displayName = environmentNames[type] ?? type;

	const customTitle =
		typeof properties.title === "string"
			? properties.title
			: "";

	const label =
		type === "proof"
			? customTitle || "Proof"
			: customTitle
				? `${displayName} (${customTitle})`
				: displayName;

	const bodyChildren =
		type === "proof"
			? addQedSymbol(children)
			: children;

	return {
		type: "element",
		tagName: "section",
		properties: {
			className: [
				"math-environment",
				`math-environment--${type}`,
			],
			dataEnvironment: type,
		},
		children: [
			{
				type: "element",
				tagName: "div",
				properties: {
					className: ["math-environment__title"],
				},
				children: [{ type: "text", value: label }],
			},
			{
				type: "element",
				tagName: "div",
				properties: {
					className: ["math-environment__body"],
				},
				children: bodyChildren,
			},
		],
	};
}