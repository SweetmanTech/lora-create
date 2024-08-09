const LeaderboardPage = () => (
  <div
    className="relative w-screen h-screen overflow-hidden
    flex flex-col items-center justify-center bg-background"
  >
    <p className="pb-2 text-[30px] font-bold">Leaderboard</p>
    <section className="border-[2px] rounded-xl overflow-hidden">
      <iframe
        src={`https://www.stack.so/leaderboard/leaderboard-40a3-78225-${process.env.NEXT_PUBLIC_POINT_SYSTEM_ID}/embed?excludeHeader=true`}
        className="mx-auto"
        width="704px"
        height="400px"
        allow="clipboard-write"
        title="leaderboard"
      />
    </section>
  </div>
)

export default LeaderboardPage
