// 'use client'
// import { getUsers } from '@/lib/db';
// import { UsersTable } from './users-table';
// import { Search } from './search';
import "./style.scss";

import HeroBanner from "@/components/heroBanner/HeroBanner";
import Trending from "@/components/trending/Trending";
import Popular from "@/components/popular/Popular";
import TopRated from "@/components/topRated/TopRated";

export default async function IndexPage({
//   searchParams
// }: {
//   searchParams: { q: string; offset: string };
}) {
  // const search = searchParams.q ?? '';
  // const offset = searchParams.offset ?? 0;
  // const { users, newOffset } = await getUsers(search, Number(offset));

  // return (
    // <main className="flex flex-1 flex-col p-4 md:p-6">
    //   <div className="flex items-center mb-8">
    //     <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
    //   </div>
    //   <div className="w-full mb-4">
    //     <Search value={searchParams.q} />
    //   </div>
    //   <UsersTable users={users} offset={newOffset} />
    // </main>
  // );
  return (
    <div className="homePage">
        <HeroBanner />
        <Trending />
        <Popular />
        <TopRated />
    </div>
);
}
