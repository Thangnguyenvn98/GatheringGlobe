import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
 
const tags = Array.from({ length: 50 }).map
(
    (_, a) => `Gathering Globe Upcoming Events.${a}`
)

function Scrollable() {
    return (
      <div className="container grid ">
        <ScrollArea className="h-72 rounded-md border">
          <div className="flex-row p-4">
            <h2 className="mb-4 text-sm leading-none font-extrabold">Upcoming Events</h2>
            {tags.map((tag) => (
              <>
                <div key={tag} className="text-sm">
                  {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    )
}

export default Scrollable;