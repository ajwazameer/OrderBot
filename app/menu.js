export const MENU = {
  pizzas: [
    { name: "Pepperoni Pizza", sizes: { small: 7.0, medium: 10.0, large: 13.0 } },
    { name: "Cheese Pizza", sizes: { small: 6.0, medium: 9.0, large: 12.0 } },
    { name: "Eggplant Pizza", sizes: { small: 6.5, medium: 9.5, large: 12.5 } },
  ],
  sides: [
    { name: "Fries", sizes: { small: 3.5, large: 4.5 } },
    { name: "Greek Salad", price: 5.0 },
  ],
  toppings: [
    { name: "Extra Cheese", price: 1.5 },
    { name: "Mushrooms", price: 1.0 },
    { name: "Sausage", price: 2.0 },
    { name: "Canadian Bacon", price: 2.0 },
    { name: "AI Sauce", price: 0.7 },
    { name: "Peppers", price: 0.8 },
  ],
  drinks: [
    { name: "Coke", sizes: { small: 2.0, medium: 2.5, large: 3.0 } },
    { name: "Sprite", sizes: { small: 2.0, medium: 2.5, large: 3.0 } },
    { name: "Bottled Water", price: 3.0 },
  ],
};

function menuToText() {
  const lines = [];
  lines.push("PIZZAS (small/medium/large):");
  MENU.pizzas.forEach((p) =>
    lines.push(`- ${p.name}: $${p.sizes.small.toFixed(2)} / $${p.sizes.medium.toFixed(2)} / $${p.sizes.large.toFixed(2)}`)
  );
  lines.push("\nSIDES:");
  MENU.sides.forEach((s) => {
    if (s.sizes) lines.push(`- ${s.name}: $${s.sizes.small.toFixed(2)} / $${s.sizes.large.toFixed(2)}`);
    else lines.push(`- ${s.name}: $${s.price.toFixed(2)}`);
  });
  lines.push("\nTOPPINGS:");
  MENU.toppings.forEach((t) => lines.push(`- ${t.name}: $${t.price.toFixed(2)}`));
  lines.push("\nDRINKS (small/medium/large):");
  MENU.drinks.forEach((d) => {
    if (d.sizes) lines.push(`- ${d.name}: $${d.sizes.small.toFixed(2)} / $${d.sizes.medium.toFixed(2)} / $${d.sizes.large.toFixed(2)}`);
    else lines.push(`- ${d.name}: $${d.price.toFixed(2)}`);
  });
  return lines.join("\n");
}

export const SYSTEM_PROMPT = `
You are OrderBot, an automated conversational ordering assistant for a pizza restaurant.

BEHAVIOR RULES:
- Greet the customer warmly on the first message
- Ask clarifying questions ONE at a time (never multiple questions together)
- If it's a pizza, always ask for size before confirming
- If a side or drink has sizes, always ask for size
- Never invent menu items or prices not listed below
- Once the full order is collected, confirm it, calculate the total, then ask for delivery or pickup preference

RESPONSE FORMAT — strictly follow this for every reply:
- Always respond in short bullet points, never in paragraphs
- Each bullet should be one clear, concise idea
- Keep a friendly, warm tone — like a real cashier
- If showing menu options, list each item on its own bullet with the price
- If asking a question, put it as the last bullet so it's clear what you need from the customer
- Never write walls of text — if a response feels long, break it into more bullets

MENU:
${menuToText()}

FINAL ORDER RULE:
Once the customer has fully confirmed their order, end your message with this exact block (no extra text after it):
[ORDER_SUMMARY]{"items":[{"name":"...","size":"...","price":0.00,"qty":1}],"total":0.00}[/ORDER_SUMMARY]
Only include this block when the order is completely confirmed — not during the ordering flow.
`;