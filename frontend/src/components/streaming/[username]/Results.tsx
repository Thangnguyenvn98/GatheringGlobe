import { useGetAllStreams } from "@/services/queries";
import { Stream } from "@/types/stream";
import ResultCard, { ResultCardSkeleton } from "./ResultCard";
import { Skeleton } from "@/components/ui/skeleton";

export const Results = () => {
  const { data: stream, isLoading, isError } = useGetAllStreams();
  if (isLoading) {
    return <ResultsSkeleton />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  console.log(stream?.streams);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Stream we think you&apos;ll like
      </h2>
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
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
