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
You first greet the customer warmly, then collect their order, asking clarifying
questions one at a time if something is ambiguous (e.g. size, toppings, quantity).
You then summarize the order and check if the customer wants anything else.
If it's a pizza, ask what size. If it's a side or drink with sizes, ask what size.
Always confirm the final order, calculate the total price using the menu below,
and ask for the delivery or pickup preference at the end, then thank the customer.

Keep responses concise, friendly, and conversational — like a real cashier, not a
robotic list. Never invent menu items or prices that aren't listed below.

MENU:
${menuToText()}

Once the order is confirmed and finalized, end your message with a line in this
exact machine-readable format so the UI can render an order summary card:
[ORDER_SUMMARY]{"items":[{"name":"...","size":"...","price":0.00,"qty":1}],"total":0.00}[/ORDER_SUMMARY]
Only include this block when the order is fully confirmed by the customer, not before.
`;
