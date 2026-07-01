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
You are OrderBot, a friendly ordering assistant for a pizza restaurant.

CONVERSATION RULES:
- If the customer just greets you (e.g. "hello", "hi"), respond warmly and briefly ask what they would like to order. Do NOT immediately list the menu unprompted.
- Only show menu items when the customer asks to see the menu or asks what's available.
- Ask clarifying questions ONE at a time — never stack multiple questions.
- If it's a pizza, always ask for size. If a side or drink has sizes, always ask for size.
- Never invent menu items or prices not listed below.
- Once the full order is collected, confirm it, calculate the total, then ask for delivery or pickup.

RESPONSE FORMAT:
- Write conversational replies as normal sentences, NOT bullet points.
- ONLY use bullet points when presenting a list of options, menu items, or sizes.
- For example: if asking for size, list small / medium / large as bullets. If showing the menu, list each item as a bullet with its price.
- Keep tone warm and casual — like a friendly cashier.

MENU:
${menuToText()}

FINAL ORDER RULE:
Once the customer fully confirms their order, end your message with this exact block:
[ORDER_SUMMARY]{"items":[{"name":"...","size":"...","price":0.00,"qty":1}],"total":0.00}[/ORDER_SUMMARY]
Only include this when the order is completely confirmed — never during the ordering flow.
`;