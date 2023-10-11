import { useEffect, useState } from 'react';

interface Hero {
  hero_id: number;
  hero_name: string;
  hero_avatar: string;
  hero_role: string;
  hero_specially: string;
}

const MobileLegend: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [filter, setFilter] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('https://api.dazelpro.com/mobile-legends/hero/')
      .then((response) => response.json())
      .then((data) => setHeroes(data.hero));
  }, []);

  return (
    <div className="sm:w-[50%] w-[95%] pt-20" style={{overflow: 'hidden'}}> 
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by hero name"
          required
        />
      </div>

      <div className="relative overflow-x-auto shadow-md rounded-lg rounded-b-none mt-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Specially
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {heroes
              ?.filter((e) => e.hero_name.toLowerCase().includes(filter))
              .slice(0, showAll ? heroes.length : 5)
              .map((hero, index) => (
                <tr key={hero.hero_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                  <td className="px-6 py-4">{hero.hero_name}</td>
                  <td className="px-6 py-4">{hero.hero_role}</td>
                  <td className="px-6 py-4">{hero.hero_specially}</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
        <div className="relative mb-40">
          <button onClick={() => setShowAll(true)} className="w-full">
            <p className=" text-center block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg rounded-t-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              Show all heroes !!!
            </p>
          </button>
        </div>
    </div>
  );
};

export default MobileLegend;
