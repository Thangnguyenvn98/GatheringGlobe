import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface EventPaginationButtonProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPlaceholderData: boolean;
}

const EventPaginationButton = ({
  currentPage,
  totalPages,
  onPageChange,
  isPlaceholderData,
}: EventPaginationButtonProps) => {
  // Generate page numbers function
  const getPageNumbers = () => {
    const pages = [];
    const pageBuffer = 2; // Number of pages before and after the current page

    // Always include the first page
    pages.push(1);

    // Logic to handle ellipses and intermediate pages
    const lowerLimit = Math.max(2, currentPage - pageBuffer);
    const upperLimit = Math.min(totalPages - 1, currentPage + pageBuffer);

    if (lowerLimit > 2) {
      pages.push("...");
    }

    for (let i = lowerLimit; i <= upperLimit; i++) {
      pages.push(i);
    }

    if (upperLimit < totalPages - 1) {
      pages.push("...");
    }

    // Always include the last page if more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1 ? "pointer-events-none" : "cursor-pointer"
            }
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                className="text-lg cursor-pointer"
                isActive={page === currentPage}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={
              isPlaceholderData || currentPage === totalPages
                ? "pointer-events-none"
                : "cursor-pointer"
            }
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default EventPaginationButton;
