export async function POST(req: Request) {

  const { question } = await req.json();

  return Response.json({
    answer:
      "You can trade crypto on Binance, Bybit or OKX."
  });

}