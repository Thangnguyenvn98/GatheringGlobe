import { useCurrentStream } from "@/services/queries";
import { Stream } from "@/types/stream";
import ResultCard from "./ResultCard";

export const Results = () => {
  const { data: stream, isLoading, isError } = useCurrentStream();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  console.log(stream?.streams);
  return (
    <div className="text-lg font-semibold mb-4">
      <h2>Stream we think you&apos;ll like</h2>
      {stream?.streams?.length === 0 && (
        <div className="text-muted-foreground text-sm">No streams found.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {stream?.streams?.map((stream: Stream) => (
          <ResultCard key={stream._id} data={stream} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return <div>ResultsSkeleton</div>;
};
