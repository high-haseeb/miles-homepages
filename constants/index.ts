export const teams = [
	{
		name: "Legal teams",
		link: "#legal-teams",
	},
	{
		name: "Sales teams",
		link: "#sales-teams",
	},
	{
		name: "Financial teams",
		link: "#financial-teams",
	},
	{
		name: "Procurement teams",
		link: "#procurement-teams",
	},
	{
		name: "HR teams",
		link: "#hr-teams",
	},
];

export const products = [
	{
		name: "Contract generation",
		link: "#contract-generation",
	},
	{
		name: "Dynamic templates",
		link: "#dynamic-templates",
	},
	{
		name: "Approval workflows",
		link: "#approval-workflows",
	},
	{
		name: "Contract automation",
		link: "#contract-automation",
	},
	{
		name: "Contract negotiation",
		link: "#contract-negotiation",
	},
	{
		name: "E-signature",
		link: "#e-signature",
	},
	{
		name: "Contract archiving",
		link: "#contract-archiving",
	},
	{
		name: "Contract monitoring",
		link: "#contract-monitoring",
	},
	{
		name: "Contract analysis",
		link: "#contract-analysis",
	},
];

export const resources = [
	{
		name: "Read our blog",
		link: "#blog",
	},
	{
		name: "Customer testimonials",
		link: "#customer-testimonials",
	},
	{
		name: "Ebooks",
		link: "#ebooks",
	},
	{
		name: "Clauses templates",
		link: "#clauses-templates",
	},
	{
		name: "Partners",
		link: "#partners",
	},
	{
		name: "News",
		link: "#news",
	},
	{
		name: "Documentation",
		link: "#documentation",
	},
	{
		name: "Status",
		link: "#status",
	},
];

export const contact = [
	{
		name: "About",
		link: "#about",
	},
	{
		name: "We're recruiting",
		link: "#we-are-recruiting",
	},
	{
		name: "Legal notice",
		link: "#legal-notice",
	},
	{
		name: "Press",
		link: "#press",
	},
	{
		name: "Facebook",
		link: "#facebook",
	},
	{
		name: "Twitter",
		link: "#twitter",
	},
	{
		name: "Linkedin",
		link: "#linkedin",
	},
	{
		name: "Youtube",
		link: "#youtube",
	},
];

export const useCases = [
	{
		name: "Track your contracts",
		link: "#contracts",
	},
	{
		name: "Collaborate on contracts",
		link: "#collaborate",
	},
];

export const minLengthRegex = /^.{8,}$/;
export const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

export const IS_DEV_MODE = process.env.NODE_ENV === "development";

export const API_URL = IS_DEV_MODE
	? `https://miles-rental-backend.onrender.com/v1`
	: `https://miles-rental-backend.onrender.com/v1`;
