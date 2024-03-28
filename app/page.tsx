import Image from "next/image";

type Game = {
  id: number;
  background_image: string;
  rating: number;
  name: string;
};

const getGames = async (): Promise<Game[]> => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=30f39b41db33481fb4cab65a120b04d5`
  );
  if (!res.ok) {
    throw new Error("failed to fetch");
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await res.json();

  return data.results;
};

export default async function Home() {
  const games = await getGames();
  return (
    <main className="bg-slate-800 text-white w-full h-full">
      <div className="h-14 bg-slate-700 gap-6 w-100 shadow-2xl flex flex-row relative justify-center items-center">
        <button className="bg-slate-600 hover:bg-slate-400 p-2 rounded-xl font-sans text-white">
          Games
        </button>
        <button className="bg-slate-600 hover:bg-slate-400 p-2 rounded-xl font-sans text-white">
          Music
        </button>
        <button className="bg-slate-600 hover:bg-slate-400 p-2 rounded-xl font-sans text-white">
          Films
        </button>
      </div>
      <div className="m-24 rounded-md grid grid-cols-4 gap-12  w-100">
        {games.map((game) => (
          <div key={game.id} className="p-8 col-span-4 md:col-span-2">
            <h1 className="font-bold text-lg">{game.name}</h1>
            <p className="text-sm mb-4">Game rating: {game.rating}</p>
            <div className="aspect-video relative">
              <Image
                src={game.background_image}
                fill
                className="object-cover rounded-md shadow-2xl"
                alt={game.name}
                sizes="100%"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
