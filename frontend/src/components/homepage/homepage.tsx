import Timer from "./timer"
import Pageheader from "./pageheader"
import {Separator} from "../ui/separator"
import Testimonials from "./testimonials"
import Events from "./events"
import Footer from "./footer"
// import Scrollable from "./scrollable"
import EventList from "./EventList"


const Homepage = () =>{
    return (
    <div className="flex flex-col justify-between">
        <div className="flex z-30 w-full bg-green-200 fixed bg-opacity-100 text-white items-center justify-center">  {/* Page Header */}
          <Pageheader />
        </div>
        <div className="flex flex-col  w-full top-50">  
            <div className="">
                <Events />
            </div> 
            <Separator orientation="horizontal" className="mb-10 mt-10"/> 
            <div>
                <EventList displayMode="grid"/>
            </div>
            <Separator orientation="horizontal" className="mb-10 mt-10"/>
            <div>
                <Timer />
            </div>
            <Separator orientation="horizontal" className="mb-10 mt-10"/>
            <div>
                <Testimonials />
            </div>
            <div className="mt-20">
                <Footer />
            </div>
        </div>
      </div>
      
    );
}
export default Homepage